const {Faculty, User, Department} = require("../models");

// note: - `employee_id` assigned manually by Admin 

const ALLOW_DESIGNATIONS= [
        "teacher","hod","principal"
];

const createFaculty = async (req, res) => {
  try {
    const { user_id, employee_id, department_id, designation, phone, address } = req.body;

    if (!user_id || !employee_id || !department_id || !designation || !phone || !address) {
      return res.status(400).json({ message: "All fields required!" });
    }

    // ✅ validate designation
    if (!ALLOW_DESIGNATIONS.includes(designation)) {
      return res.status(400).json({ message: "Invalid designation" });
    }

    // ✅ validate user
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Invalid user id" });
    }

    // ✅ validate department
    const department = await Department.findByPk(department_id);
    if (!department) {
      return res.status(404).json({ message: "Invalid department id" });
    }

    // ✅ prevent duplicate employee_id
    const exists = await Faculty.findOne({ where: { employee_id } });
    if (exists) {
      return res.status(409).json({ message: "Employee ID already exists" });
    }

    const faculty = await Faculty.create({
      user_id,
      employee_id,
      department_id,
      designation,
      phone,
      address,
      is_active: true,
    });

    res.status(201).json(faculty);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllFaculty = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const where = { is_active: true };

    // 🔥 teacher/hod sees only themselves
    if (["teacher", "hod"].includes(req.user.role)) {
      where.user_id = req.user.id;
    }

    const { count, rows } = await Faculty.findAndCountAll({
      where,
      order: [["id", "ASC"]],
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Department,
          attributes: ["id", "name"],
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

const getFacultyById = async (req, res) => {
  try {
    const facultyId = req.params.id;

    const faculty = await Faculty.findByPk(facultyId, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Department, attributes: ["id", "name"] },
      ],
    });

    if (!faculty) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // 🔥 restrict access
    if (
      ["teacher", "hod"].includes(req.user.role) &&
      faculty.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(faculty);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



const updateFaculty = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const { designation, phone, address } = req.body;

    const faculty = await Faculty.findByPk(facultyId);

    if (!faculty) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // 🔥 restrict update
    if (
      ["teacher", "hod"].includes(req.user.role) &&
      faculty.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await faculty.update({
      designation,
      phone,
      address,
    });

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteFaculty = async (req, res) => {
    try {
        const facultyId = req.params.id;
     
                const faculty = await Faculty.findByPk(facultyId);
        
        if(!faculty)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        // deleteFaculty — missing is_active check before deleting
// if (faculty.is_active) {
//   return res.status(400).json({ message: "Cannot delete an active faculty" })
// } 
    
await faculty.update({ is_active: false });

res.status(200).json({ message: "faculty deleted successfully" });
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

module.exports.facultyController = {
  createFaculty, getAllFaculty, getFacultyById, updateFaculty, deleteFaculty
}