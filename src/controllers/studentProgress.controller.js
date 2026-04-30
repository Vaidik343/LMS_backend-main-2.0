const { StudentProgress, Student, Batch, Division, Semester, AcademicYear } = require("../models");

const createStudentProgress = async (req, res) => {
  try {
    // only admin

    // if (!["admin"].includes(req.user.role)) {
    //   return res.status(403).json({
    //     message: "Forbidden",
    //   });
    // }

    const {
      student_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      current,
    } = req.body;

    if (
      !student_id ||
      !batch_id ||
      !division_id ||
      !semester_id ||
      !academic_year_id ||
      !current
    ) {
      return res.status(400).json({ message: "field required!" });
    }

    // prevent duplicate
    const existing = await StudentProgress.findOne({
      where: {
        student_id,
        batch_id,
        division_id,
        semester_id,
        academic_year_id,
      },
    });

    if (existing) {
      return res.status(409).json({
        message: "already exists",
      });
    }

        // 🔥 remove old current
    await StudentProgress.update(
      { current: false },
      { where: { student_id } }
    );

    const studentProgress = await StudentProgress.create({
      student_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      current,
      is_active: true,
    });

    res.status(201).json(studentProgress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllStudentProgress = async (req, res) => {
  try {
    const {
      student_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      current,
    } = req.query;

      const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const where = { is_active: true };

// 🔥 ROLE BASED RESTRICTION FIRST
if (req.user.role === "student") {
  where.student_id = req.user.id;
} else {
  // only allow filters for non-students
  if (student_id) where.student_id = student_id;
}

     // filters
    if (batch_id) where.batch_id = batch_id;
    if (division_id) where.division_id = division_id;
    if (semester_id) where.semester_id = semester_id;
    if (academic_year_id) where.academic_year_id = academic_year_id;
    if (current !== undefined) where.current = current;


 

            const {count, rows} = await StudentProgress.findAndCountAll({
            order:[["id", "ASC"]],
            limit,
            offset,
            where,
             include: [
        { model: Student },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear},
      ],
        })



        res.status(200).json({ data: rows, total: count, page, limit})

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const getStudentProgressById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id)
        {
return res.status(400).json({ message: "Invalid Id" });
        }

        const progress = await StudentProgress.findByPk(id,{
            include: [
        { model: Student },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear},
      ],
        })

        if(!progress) 
        {
          return res.status(404).json({ message: "Not Found!" });
        }

    // 🔥 student restriction
    if (
      req.user.role === "student" &&
      progress.student_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

const promoteStudent = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

    const { student_id, semester_id, academic_year_id } = req.body;

    if (!student_id || !semester_id || !academic_year_id) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔥 get current progress
    const current = await StudentProgress.findOne({
      where: { student_id, current: true },
    });

    if (!current) {
      return res.status(404).json({
        message: "Current progress not found",
      });
    }

    // 🔥 deactivate current
    await current.update({ current: false });

    // 🔥 create new progress
    const newProgress = await StudentProgress.create({
      student_id,
      batch_id: current.batch_id,
      division_id: current.division_id,
      semester_id,
      academic_year_id,
      current: true,
      is_active: true,
    });

    res.status(201).json({
      message: "Student promoted successfully",
      data: newProgress,
    });

  } catch (error) {
    console.log("🚀 promoteStudent error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.studentProgressController = {
  createStudentProgress, getAllStudentProgress, getStudentProgressById, promoteStudent
}