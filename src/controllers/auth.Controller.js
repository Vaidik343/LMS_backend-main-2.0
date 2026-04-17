// controllers/authController.js

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: google_id,
      email,
      name,
      picture: avatar_url,
    } = payload;

    let user = await User.findOne({ where: { google_id } });

    if (!user) {
      user = await User.create({
        name,
        email,
        google_id,
        avatar_url,
        role: "student",
        is_active: true,
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Invalid Google token" });
  }
};

module.exports = { loginWithGoogle };