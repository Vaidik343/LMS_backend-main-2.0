const { FacultyAssignMaster, Faculty, Department, Course, Batch, Division, Semester, Subject, AcademicYear } = require("../models");

const createFacultyAssign = async (req, res) => {
    try {
        const { faculty_id, department_id, course_id, batch_id, division_id, semester_id, subject_id, academic_year_id } = req.body;


         // role check
    // if (!["admin", "hod"].includes(req.user.role)) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }


        if (!faculty_id || !department_id || !course_id || !batch_id || !division_id || !semester_id || !subject_id) {
            return res.status(400).json({ message: "field required!" });
        }


        const faculty = await Faculty.findByPk(faculty_id);
        if (!faculty) {
            return res.status(404).json({ message: "Invalid faculty " });
        }


        const department = await Department.findByPk(department_id);

        if (!department) {
            return res.status(404).json({ message: "Invalid Department" })
        }


        const course = await Course.findByPk(course_id);
        if (!course) {
            return res.status(404).json({ message: "Invalid Course" });
        }

        const batch = await Batch.findByPk(batch_id);
        if (!batch) {
            return res.status(404).json({ message: "Invalid Batch" });
        }

        const division = await Division.findByPk(division_id);
        if (!division) {
            return res.status(404).json({ message: "Invalid Division" });
        }

        const semester = await Semester.findByPk(semester_id);

        if (!semester) {
            return res.status(404).json({ message: "Invalid Semester" });
        }


        const subject = await Subject.findByPk(subject_id);

        if (!subject) {
            return res.status(404).json({ message: "Invalid Subject" });
        }


        const academicYear = await AcademicYear.findByPk(academic_year_id);

        if (!academicYear) {
            return res.status(404).json({ message: "Invalid academic year" });
        }



    // prevent duplicate
    const existing = await FacultyAssignMaster.findOne({
      where: {
        faculty_id,
        subject_id,
        batch_id,
        division_id,
        semester_id,
        academic_year_id,
      },
    });

    if (existing) {
      return res.status(409).json({
        message: "Assignment already exists",
      });
    }


        const facultyAssign = await FacultyAssignMaster.create({ faculty_id, department_id, course_id, batch_id, division_id, semester_id, subject_id , academic_year_id});

        res.status(201).json(facultyAssign);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

const getAllFacultyAssignMaster = async (req, res) => {
    try {
                const { faculty_id, department_id, course_id, batch_id, division_id, semester_id, subject_id, academic_year_id } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page -1) * limit;


const where = { is_active: true };


// ROLE FILTER
    // if (req.user.role === "teacher") {
    //   where.faculty_id = req.user.id;
    // }



    // filters
    if (faculty_id) where.faculty_id = faculty_id;
    if (subject_id) where.subject_id = subject_id;
    if (batch_id) where.batch_id = batch_id;
    if (division_id) where.division_id = division_id;
    if (semester_id) where.semester_id = semester_id;
    if (academic_year_id) where.academic_year_id = academic_year_id;

        const {count, rows} = await FacultyAssignMaster.findAndCountAll({
            order:[["id", "DESC"]],
            limit,
            offset,
            where,
             include: [
        { model: Faculty },
        { model: Subject },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear },
      ],
        })

        res.status(200).json({ data: rows, total: count, page, limit})
    } catch (error) {
        console.log("~ error:", error)
        res.status(500).json({message:"Server Error"})
    }
}


const getFacultyAssignById = async (req, res) => {
  try {
    const id = req.params.id;

    const assign = await FacultyAssignMaster.findByPk(id, {
      include: [
        { model: Faculty },
        { model: Subject },
        { model: Batch },
        { model: Division },
        { model: Semester },
        { model: AcademicYear },
      ],
    });

    if (!assign) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // 🔥 Teacher can only see their own
    // if (
    //   req.user.role === "teacher" &&
    //   assign.faculty_id !== req.user.id
    // ) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

    res.status(200).json(assign);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateFacultyAssign = async (req, res) => {
  try {
    const id = req.params.id;

    // if (!["admin", "hod"].includes(req.user.role)) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

    const assign = await FacultyAssignMaster.findByPk(id);

    if (!assign) {
      return res.status(404).json({ message: "Not Found!" });
    }

    const {
      faculty_id,
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
    } = req.body;

    await assign.update({
      faculty_id,
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
    });

    res.status(200).json({ message: "Updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const deleteFacultyAssignMaster = async (req,res) => {
    try {
        const facultyAssignId = req.params.id;
        const facultyAssign = await FacultyAssignMaster.findByPk(facultyAssignId);

        if(!facultyAssign)
        {
            return res.status(404).json({message: "Not Found!"})
        }
        if(facultyAssign.is_active)
        {
             return res.status(400).json({message:"Cannot delete an active master"});
        }


    // if (!["admin", "hod"].includes(req.user.role)) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

                await facultyAssign.update({is_active: false});
        res.status(200).json({message:"faculty master Deactivated!"})

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

module.exports.facultyAssignMasterController = {
    createFacultyAssign, getAllFacultyAssignMaster, getFacultyAssignById , updateFacultyAssign, deleteFacultyAssignMaster
}