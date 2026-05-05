const { Department } = require("../models");

const createDepartment = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !code || !description) {
      return res.status(400).json({ message: "All field required!" });
    }

    //duplicate check
const existing = await Department.findOne({ where: { code } })
if (existing) {
  return res.status(409).json({ message: "Department with this code already exists" })
}
    const department = await Department.create({
      name,
      code,
      description,
      is_active: true,
    });

    res.status(200).json({ message: "Department creaetd!", department });
  } catch (error) {
    console.log("🚀 ~ createDepartment ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get all

const getAllDepartment = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const where = {is_active:true}

    const { count, rows } = await Department.findAndCountAll({
      order: [["name", "ASC"]],
      limit,
      offset,
      where
    });

    res
      .status(200)
      .json({
        message: "List of All Departments",
        data: rows,
        total: count,
        page,
        limit,
      });
  } catch (error) {
    console.log("🚀 ~ getAllDepartment ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get by id
const getByDepartmentId = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await Department.findByPk(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.log("🚀 ~ getById ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// update

const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const { name, code, description } = req.body;
    const department = await Department.findByPk(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Not Found" });
    }

    await department.update({ name, code, description });
    res.status(200).json({ message: "Department updated", department });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("🚀 ~ updateDepartment ~ error:", error);
  }
};

//delete

const deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const department = await Department.findByPk(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Not Found" });
    }
    // if (department.is_active) {
    //   return res
    //     .status(400)
    //     .json({ message: "Cannot delete an active Department" });
    // }

    await department.update({ is_active: false });
    res.status(200).json({ message: "Department deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("🚀 ~ deleteDepartment ~ error:", error);
  }
};

// const setActiveDepartment = async (req, res) => {
//   try {
//     const departmentId = req.params.id;

//     const department = await Department.findByPk(departmentId);

//     if (!department) {
//       return res.status(404).json({ message: "Not Found!" });
//     }

//     // deactivate all others first
//     await Department.update({ is_active: false }, { where: {} });
//     await department.update({ is_active: true });

//     // await Department.update({ is_active: false }, { where: {} });

//     // await department.update({ is_active: true });
//     res.status(200).json({ message: "Department set as active successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
module.exports.departmentController = {
  createDepartment,
  getAllDepartment,
  getByDepartmentId,
  updateDepartment,
  deleteDepartment,
  // setActiveDepartment,
};
