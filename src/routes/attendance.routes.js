const express = require("express");
const router = express.Router();

const {attendanceController} = require("../controllers/attendance.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");


router.use(authenticate)  

router.post("/attendances", roleAuth("Attendance","create"), attendanceController.createBulkAttendance);

router.get("/attendances", roleAuth("Attendance","read"), attendanceController.getAllAttendance);

router.get("/attendances/:id", roleAuth("Attendance","read"), attendanceController.getAttendanceById);

router.get("/attendance/me", roleAuth("Attendance","read"), attendanceController.getMyAttendance);

router.put("/attendances/:id", roleAuth("Attendance","update"), attendanceController.updateAttendance);

// router.delete("/attendance/:id", roleAuth(), attendanceController.deleteAttendance);

module.exports = router; 