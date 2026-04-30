const express = require('express');
const router = express.Router();

const {facultyAssignMasterController} = require("../controllers/facultyAssignMaster.controller");
const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/faculty_assign_master", roleAuth("FacultyAssignMaster", "create"), facultyAssignMasterController.createFacultyAssign);

router.get("/faculty_assign_master", roleAuth("FacultyAssignMaster", "read"), facultyAssignMasterController.getAllFacultyAssignMaster);

router.get("/faculty_assign_master/:id", roleAuth("FacultyAssignMaster", "read"), facultyAssignMasterController.getFacultyAssignById);
router.put("/faculty_assign_master/:id", roleAuth("FacultyAssignMaster", "read"), facultyAssignMasterController.getFacultyAssignById);
router.delete("/faculty_assign_master/:id", roleAuth("FacultyAssignMaster", "read"), facultyAssignMasterController.getFacultyAssignById);


