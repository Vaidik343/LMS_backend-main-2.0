const { User } = require("../models");

// allowed enum values
const ALLOWED_ROLES = ["admin", "principal", "hod", "teacher", "student"];

// ================= GET ALL USERS =================
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      order: [["id", "ASC"]],
      limit,
      offset,
      attributes: { exclude: ["google_id"] } // hide sensitive data
    });

    res.status(200).json({
      message: "Users fetched successfully",
      data: rows,
      total: count,
      page,
      limit,
    });
  } catch (error) {
    console.log("🚀 getAllUsers error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET USER BY ID =================
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["google_id"] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("🚀 getUserById error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= UPDATE USER =================
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, role, avatar_url } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // role validation
    if (role && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.update({
      name: name ?? user.name,
      role: role ?? user.role,
      avatar_url: avatar_url ?? user.avatar_url,
    });

    res.status(200).json({
      message: "User updated successfully",
      user
    });

  } catch (error) {
    console.log("🚀 updateUser error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE USER (SOFT DELETE) =================
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ is_active: false });

    res.status(200).json({
      message: "User deactivated successfully"
    });

  } catch (error) {
    console.log("🚀 deleteUser error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET MY PROFILE =================
// const getMyProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // from auth middleware

//     const user = await User.findByPk(userId, {
//       attributes: { exclude: ["google_id"] }
//     });

//     res.status(200).json(user);

//   } catch (error) {
//     console.log("🚀 getMyProfile error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

module.exports.userController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  // getMyProfile
};






















// const { User } = require("../models");

// // allowed enum values
// const ALLOWED_ROLES = ["admin", "principal", "hod", "teacher", "student"];

// const createUser = async (req, res) => {
//   try {
//     const { name, email, google_id, role, avatar_url } = req.body;

//     if (!name || !email || !google_id || !role) {
//       return res.status(400).json({ message: "field required!" });
//     }

//     //validation roles
//     if (!ALLOWED_ROLES.includes(role)) {
//       return res.status(400).json({
//         message: "Invalid Role",
//       });
//     }

//     const userCreate = await User.create({
//       name,
//       email,
//       google_id,
//       role,
//       avatar_url,
//       is_active: true,
//     });
//     res.status(200).json(userCreate);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// //get all users

// const getAllUsers = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = Math.min(parseInt(req.query.limit) || 20, 50);
//     const offset = (page - 1) * limit;

//     const { count, rows } = await User.findAndCountAll({
//       order: [["id", "ASC"]],
//       limit,
//       offset,
//     });

//     return res.status(200).json({
//       message: "User fetched successfully",
//       data: rows,
//       total: count,
//       page,
//       limit,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "Not Found!" });
//     }

//     res.status(200).json({ message: "User Found", user });
//   } catch (error) {
//     console.log("🚀 ~ error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { name, email, google_id, role, avatar_url } = req.body;
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "Not Found!" });
//     }

//     await user.update({ name, email, google_id, role, avatar_url });
//     res.status(200).json({ message: "User updated!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "Not Found!" });
//     }

//     await user.update({ is_active: false });
//     res.status(200).json({ message: "User Delete!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


// module.exports = {createUser, updateUser, getAllUsers, getUserById, deleteUser}