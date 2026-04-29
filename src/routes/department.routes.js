const express = require('express');
const router = express.Router();
const {departmentController} = require('../controllers/department.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/departments", roleAuth('Department', 'create'), departmentController.createDepartment);

router.get("/departments", roleAuth('Department', 'read'), departmentController.getAllDepartment);
router.get("/departments/:id", roleAuth('Department', 'read'),departmentController.getByDepartmentId);

router.put("/departments/:id",  roleAuth('Department', 'update'), departmentController.updateDepartment);


router.delete("/departments/:id", roleAuth('Department', 'delete'), departmentController.deleteDepartment);


module.exports = router
