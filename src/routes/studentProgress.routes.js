const express = require("express");
const router = express.Router();

const {studentProgressController} = require("../controllers/studentProgress.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/student_progress", roleAuth("StudentProgress", "create"), studentProgressController.createStudentProgress);

router.get("/student_progress", roleAuth("StudentProgress", "read"), studentProgressController.getAllStudentProgress);

router.get("/student_progress/:id", roleAuth("StudentProgress", "read"), studentProgressController.getStudentProgressById);

router.patch("/student_progress/:id/promote", roleAuth("StudentProgress", "update"), studentProgressController.promoteStudent)


module.exports = router