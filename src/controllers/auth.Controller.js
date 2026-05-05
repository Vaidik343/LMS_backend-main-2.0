// controllers/authController.js

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User ,RefreshToken } = require("../models");
const crypto = require("crypto")
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ================= TOKEN HELPERS =================

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30m" } // short-lived
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

// ================= LOGIN =================

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log("🚀 ~ loginWithGoogle ~ token length:", token ? token.length : 0);
    // console.log("🚀 ~ loginWithGoogle ~ GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

    if (!token) {
      console.log("🚀 ~ loginWithGoogle ~ missing token");
      return res.status(400).json({ message: "Google token required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("🚀 ~ loginWithGoogle ~ payload:", {
      sub: payload.sub,
      email: payload.email,
      aud: payload.aud,
      iss: payload.iss,
    });

    const {
      sub: google_id,
      email,
      name,
      picture: avatar_url,
    } = payload;

    let user = await User.findOne({ where: { google_id } });
    console.log("🚀 ~ loginWithGoogle ~ user by google_id:", user ? user.id : null);

    if (!user) {
      user = await User.findOne({ where: { email } });
      console.log("🚀 ~ loginWithGoogle ~ user by email:", user ? user.id : null);
      if (user) {
        user.google_id = google_id;
        await user.save();
      }
    }

    if (!user) {
      console.log("🚀 ~ loginWithGoogle ~ no user found for google_id/email", { google_id, email });
      return res.status(401).json({ message: "You are not registered in the system" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Your account is disabled" });
    }
    // 🔥 NEW: generate tokens
    const accessToken = generateAccessToken(user);
    const refreshTokenValue = generateRefreshToken();

    // 🔥 store refresh token
    await RefreshToken.create({
      user_id: user.id,
      token: refreshTokenValue,
      is_active: true,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken: refreshTokenValue,
      user,
    });

  } catch (error) {
    console.log("🚀 login error name:", error.name);
    console.log("🚀 login error message:", error.message);
    console.log("🚀 login error stack:", error.stack);
    res.status(500).json({ message: "Invalid Google token", error: error.message });
  }
};

// ================= REFRESH TOKEN =================

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token required",
      });
    }

    const stored = await RefreshToken.findOne({
      where: {
        token: refreshToken,
        is_active: true,
      },
    });

    if (!stored) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const user = await User.findByPk(stored.user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// ================= LOGOUT =================

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token required",
      });
    }

    await RefreshToken.update(
      { is_active: false },
      {
        where: {
          token: refreshToken,
          user_id: req.user.id,
        },
      }
    );

    res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.authController = { loginWithGoogle, refreshToken, logout, getMe };