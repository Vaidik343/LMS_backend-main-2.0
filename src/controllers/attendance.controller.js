const { Attendance, Session, Student, sequelize } = require("../models");

// ================= BULK CREATE / UPDATE =================
const createBulkAttendance = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { session_id, students } = req.body;

    // 1. Validate input
    if (!session_id || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({message:"field required!"});
    }

    // 2. Validate session
    const session = await Session.findByPk(session_id, { transaction: t });
    if (!session) {
      await t.rollback();
      return res.status(404).json({ message: "Invalid Session" });
    }
    // 3. Validate students
    const studentIds = students.map((s) => s.student_id);

    const validStudents = await Student.findAll({
      where: { id: studentIds },
      transaction: t,
    });

    if (validStudents.length !== studentIds.length) {
      await t.rollback();
      return res.status(400).json({
        message: "Some student IDs are invalid",
      });
    }

    const invalid = students.find((s) => s.is_present === undefined);
    if (invalid) {
      await t.rollback();
      return res.status(400).json({
        message: `is_present required for student ${invalid.student_id}`,
      });
    }

    // 5. Prepare data
    const data = students.map((s) => ({
      session_id,
      student_id: s.student_id,
      is_present: s.is_present,
      remark: s.remark || null,
      is_active: true,
    }));

    // 6. Bulk upsert
    await Attendance.bulkCreate(data, {
      transaction: t,
      updateOnDuplicate: ["is_present", "remark", "is_active"],
    });

    await t.commit();

    // 7. Return response
    res.status(200).json({
      message: "Attendance processed successfully",
      count: data.length,
    });
  } catch (error) {
    await t.rollback();
    console.log("🚀 bulk attendance error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET ALL (WITH FILTERS)
const getAllAttendance = async (req, res) => {
  try {
    const { student_id, session_id } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    // filters
    const where = {};
    // 🔥 student sees only their data
    if (req.user.role === "student") {
      where.student_id = req.user.id;
    } else {
      if (student_id) where.student_id = student_id;
    }

    if (session_id) where.session_id = session_id;

    const { count, rows } = await Attendance.findAndCountAll({
      where,
      limit,
      offset,
      order: [["student_id", "ASC"]],
      include: [
         {
    model: Student,
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  },
        {
          model: Session,
          attributes: ["id", "session_date", "start_time", "end_time"],
        },
      ],
    });

    res.status(200).json({
      data: rows,
      total: count,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET BY ID
const getAttendanceById = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    const attendance = await Attendance.findByPk(attendanceId, {
      include: [
        {
          model: Student,
          attributes: ["id", "name"],
        },
        {
          model: Session,
          attributes: ["id", "session_date"],
        },
      ],
    });

    if (!attendance) {
      return res.status(404).json({ message: "Not Found!" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE
const updateAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const { is_present, remark } = req.body;

    const attendance = await Attendance.findByPk(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Not Found!" });
    }

    const updated = await attendance.update({
      is_present,
      remark,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// maybe attendance cant be deleted
// SOFT DELETE
// const deleteAttendance = async (req, res) => {
//   try {
//     const attendanceId = req.params.id;

//     const attendance = await Attendance.findByPk(attendanceId);

//     if (!attendance) {
//       return res.status(404).json({ message: "Not Found!" });
//     }

//     await attendance.update({ is_active: false });

//     res.status(200).json({ message: "Attendance deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// STUDENT SELF
const getMyAttendance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const studentId = req.user.id;

    const attendance = await Attendance.findAll({
      where: { student_id: studentId },
      include: [
        {
          model: Session,
          attributes: ["id", "session_date", "start_time", "end_time"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.attendanceController = {
  createBulkAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  // deleteAttendance,
  getMyAttendance,
};
