const { message } = require("statuses");
const { User } = require("../models");

// allowed enum values
const ALLOWED_ROLES = ["admin", "principal", "hod", "teacher", "student"];

const createUser = async (req, res) => {
  try {
    const { name, email, google_id, role, avatar_url } = req.body;

    if (!name || !email || !google_id || !role) {
      return res.status(400).json({ message: "field required!" });
    }

    //validation roles
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        message: "Invalid Role",
      });
    }

    const userCreate = await User.create({
      name,
      email,
      google_id,
      role,
      avatar_url,
      is_active: true,
    });
    res.status(200).json(userCreate);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//get all users

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return res.status(200).json({
      message: "User fetched successfully",
      data: rows,
      total: count,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Not Found!" });
    }

    res.status(200).json({ message: "User Found", user });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, google_id, role, avatar_url } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Not Found!" });
    }

    await user.update({ name, email, google_id, role, avatar_url });
    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Not Found!" });
    }

    await user.update({ is_active: false });
    res.status(200).json({ message: "User Delete!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {createUser, updateUser, getAllUsers, getUserById, deleteUser}