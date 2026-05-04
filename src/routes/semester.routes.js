const express = require('express');
const router = express.Router();

const {semesterController} = require("../controllers/semester.controller");
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/semesters", roleAuth("Semester", "create"), semesterController.createSemester);

router.get("/semesters", roleAuth("Semester", "read"), semesterController.getAllSemester);

router.get("/semesters/:id", roleAuth("Semester", "read"), semesterController.getSemesterById);

router.put("/semesters/:id", roleAuth("Semester", "update"), semesterController.updateSemester);

router.delete("/semester/:id", roleAuth("Semester", "delete"), semesterController.deleteSemester);

router.patch("/semesters/:id/set-active", roleAuth("Semester", "setActive"), semesterController.setActiveSemester);


module.exports = router;
