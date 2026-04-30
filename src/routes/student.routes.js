const express = require('express');
const router = express.Router();

const {studentController} = require('../controllers/student.controller');
const {authenticate} = require('../middleware/authMiddleware');
const {roleAuth} = require("../middleware/roleMiddleware");


router.use(authenticate);

router.post("/students", roleAuth("Student", "create"), studentController.createStudent);

router.get("/students", roleAuth("Student", "read"), studentController.getAllStudent);

router.get("/students/:id", roleAuth("Student", "read"), studentController.getStudentById);

router.put("/students/:id", roleAuth("Student", "update"), studentController.updateStudent);

router.delete("/students/:id", roleAuth("Student", "delete"), studentController.deleteStudent);


module.exports = router;
