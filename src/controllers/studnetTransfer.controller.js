const {
 Student, StudentProgress, StudentTransfer, Batch, Division,
 sequelize
} = require("../models");

// transfer + sync

const transferStudent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    // 🔒 only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      student_id,
      to_batch_id,
      to_division_id,
      transfer_date,
      remark,
    } = req.body;

    if (!student_id || !to_batch_id || !to_division_id || !transfer_date) {
      throw new Error("All required fields must be provided");
    }

    // ✅ validate student
    const student = await Student.findByPk(student_id, { transaction: t });
    if (!student) throw new Error("Invalid student");

    // ✅ validate batch/division
    const batch = await Batch.findByPk(to_batch_id, { transaction: t });
    const division = await Division.findByPk(to_division_id, { transaction: t });

    if (!batch || !division) {
      throw new Error("Invalid batch or division");
    }

    // 🔥 current progress
    const current = await StudentProgress.findOne({
      where: { student_id, current: true },
      transaction: t,
    });

    if (!current) throw new Error("Current progress not found");

    // ❗ prevent same transfer
    if (
      current.batch_id === to_batch_id &&
      current.division_id === to_division_id
    ) {
      throw new Error("Student already in same batch/division");
    }

    // ================= UPDATE PROGRESS =================
    await current.update({ current: false }, { transaction: t });

    const newProgress = await StudentProgress.create(
      {
        student_id,
        batch_id: to_batch_id,
        division_id: to_division_id,
        semester_id: current.semester_id,
        academic_year_id: current.academic_year_id,
        current: true,
        is_active: true,
      },
      { transaction: t }
    );

    // ================= TRANSFER LOG =================
    const transfer = await StudentTransfers.create(
      {
        student_id,
        from_batch_id: current.batch_id,
        to_batch_id,
        from_division_id: current.division_id,
        to_division_id,
        transfer_date,
        remark,
        transferred_by: req.user.id,
        is_active: true,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(200).json({
      message: "Student transferred successfully",
      progress: newProgress,
      transfer_log: transfer,
    });

  } catch (error) {
    await t.rollback();

    console.log("🚀 transfer error:", error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

const getTransferHistory = async (req, res) => {
  try {
    const { student_id } = req.query;

    // ✅ validation
    if (!student_id) {
      return res.status(400).json({
        message: "student_id is required",
      });
    }

    // ✅ role check
    if (
      req.user.role === "student" &&
      req.user.id !== student_id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!["admin", "teacher", "student"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const transfers = await StudentTransfers.findAll({
      where: {
        student_id,
        is_active: true,
      },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Batch, as: "fromBatch" },
        { model: Batch, as: "toBatch" },
        { model: Division, as: "fromDivision" },
        { model: Division, as: "toDivision" },
      ],
    });

    res.status(200).json({
      message: "Transfer history fetched successfully",
      count: transfers.length,
      data: transfers,
    });

  } catch (error) {
    console.log("🚀 getTransferHistory error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getStudentFullHistory = async (req, res) => {
  try {
    const { student_id } = req.query;

    // ✅ validation
    if (!student_id) {
      return res.status(400).json({
        message: "student_id is required",
      });
    }

    // ✅ role protection
    if (
      req.user.role === "student" &&
      req.user.id !== student_id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!["admin", "teacher", "student"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // ================= CURRENT STATE =================
    const current = await StudentProgress.findOne({
      where: {
        student_id,
        current: true,
        is_active: true,
      },
      include: [
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear },
      ],
    });

    // ================= TRANSFER HISTORY =================
    const transfers = await StudentTransfers.findAll({
      where: {
        student_id,
        is_active: true,
      },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Batch, as: "fromBatch" },
        { model: Batch, as: "toBatch" },
        { model: Division, as: "fromDivision" },
        { model: Division, as: "toDivision" },
      ],
    });

    res.status(200).json({
      message: "Student full history fetched successfully",
      data: {
        current_state: current,
        transfer_history: transfers,
      },
    });

  } catch (error) {
    console.log("🚀 getStudentFullHistory error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
    getStudentFullHistory, getTransferHistory, transferStudent
}









