const {Assessment} = require("../models");

const createAssessment = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      title,
      assessment_type,
      total_marks,
      assessment_date,
    } = req.body;

    const faculty_id = req.user.id;

    if (
      !subject_id || !batch_id || !division_id ||
      !semester_id || !academic_year_id ||
      !title || !assessment_type ||
      !total_marks || !assessment_date
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Assessment.findOne({
      where: {
        faculty_id,
        subject_id,
        batch_id,
        division_id,
        semester_id,
        academic_year_id,
        title,
      },
    });

    if (existing) {
      return res.status(409).json({
        message: "Assessment already exists",
      });
    }

    const assessment = await Assessment.create({
      faculty_id,
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      title,
      assessment_type,
      total_marks,
      assessment_date,
      is_active: true,
    });

    res.status(201).json(assessment);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllAssessment = async (req, res) => {
  try {
    const {
      faculty_id,
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
    } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const where = { is_active: true };

    // 🔥 Teacher sees only their data
    if (req.user.role === "teacher") {
      where.faculty_id = req.user.id;
    }

    // filters
    if (faculty_id) where.faculty_id = faculty_id;
    if (subject_id) where.subject_id = subject_id;
    if (batch_id) where.batch_id = batch_id;
    if (division_id) where.division_id = division_id;
    if (semester_id) where.semester_id = semester_id;
    if (academic_year_id) where.academic_year_id = academic_year_id;

    const { count, rows } = await Assessment.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
      include: [
        { model: Faculty },
        { model: Subject },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear },
      ],
    });

    res.status(200).json({ data: rows, total: count, page, limit });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAssessmentById = async (req, res) => {
  try {
    const id = req.params.id;

    const assessment = await Assessment.findByPk(id, {
      include: [
        { model: Faculty },
        { model: Subject },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear },
      ],
    });

    if (!assessment) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // 🔥 Teacher restriction
    if (
      req.user.role === "teacher" &&
      assessment.faculty_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(assessment);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const id = req.params.id;

    const assessment = await Assessment.findByPk(id);

    if (!assessment) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // 🔥 Teacher can only update their own
    if (
      req.user.role === "teacher" &&
      assessment.faculty_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await assessment.update(req.body);

    res.status(200).json({ message: "Updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



const deleteAssessment = async (req, res) => {
  try {
    const id = req.params.id;

    const assessment = await Assessment.findByPk(id);

    if (!assessment) {
      return res.status(404).json({ message: "Not Found!" });
    }

    if (
      req.user.role === "teacher" &&
      assessment.faculty_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await assessment.update({ is_active: false });

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
    createAssessment, getAllAssessment, getAssessmentById, deleteAssessment
}