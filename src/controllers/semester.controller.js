const { Semester, Batch, Course } = require("../models");

const createSemester = async (req, res) => {
    try {
        let { batch_id, course_id, number, label } = req.body;

        if (!batch_id || !course_id || !number) {
            return res.status(400).json({ message: "Fields required!" });
        }

        // validate number
        if (isNaN(number) || number <= 0) {
            return res.status(400).json({
                message: "Semester number must be positive"
            });
        }

        // FK validation
        const batch = await Batch.findByPk(batch_id);
        if (!batch) {
            return res.status(404).json({ message: "Invalid Batch" });
        }

        const course = await Course.findByPk(course_id);
        if (!course) {
            return res.status(404).json({ message: "Invalid Course" });
        }

        // relation validation
        if (batch.course_id !== course_id) {
            return res.status(400).json({
                message: "Batch does not belong to this course"
            });
        }

        // duplicate check
        const existing = await Semester.findOne({
            where: { batch_id, number }
        });

        if (existing) {
            return res.status(409).json({
                message: "Semester already exists for this batch"
            });
        }

        const semester = await Semester.create({
            batch_id,
            course_id,
            number,
            label,
            is_active: true
        });

        res.status(201).json({
            message: "Semester created",
            data: semester
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getAllSemester = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows } = await Semester.findAndCountAll({
      order: [["number", "ASC"]],
      limit,
      offset,
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

const getSemesterById = async (req, res) => {
  const semesterId = req.params.id;
  try {
    const semester = await Semester.findByPk(semesterId);

    if (!semester) {
      return res.status(404).json({ message: "Not Found!" });
    }

    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateSemester = async (req, res) => {
  const semesterId = req.params.id;
  const { batch_id, course_id, number, label } = req.body;
  try {
    const semester = await Semester.findByPk(semesterId);

    if (!semester) {
      return res.status(404).json({ message: "Not Found!" });
    }

    const updateSemester = await semester.update({ number, label });
    res.status(200).json(updateSemester);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteSemester = async (req, res) => {
  const semesterId = req.params.id;
  try {
    const semester = await Semester.findByPk(semesterId);

    if (!semester) {
      return res.status(404).json({ message: "Not Found!" });
    }
    // if (semester.is_active) {
    //   return res
    //     .status(400)
    //     .json({ message: "Cannot delete an active semester" });
    // }

    await semester.update({ is_active: false });
    res.status(200).json({ message: "Semester deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const setActiveSemester = async (req, res) => {
  const semesterId = req.params.id;
  try {
    const semester = await Semester.findByPk(semesterId);

    if (!semester) {
      return res.status(404).json({ message: "Not Found!" });
    }

    await semester.update({ is_active: true });
    res.status(200).json({ message: "Semester set as active" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.semesterController = {
  createSemester,
  getAllSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
  setActiveSemester,
};
