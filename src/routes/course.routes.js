const express = require('express');
const router = express.Router();
const {courseController} = require('../controllers/course.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);


router.post("/courses", roleAuth('Course', 'create'), courseController.createCourse);

router.get("/courses", roleAuth('Course', 'read'), courseController.getAllCourse)

router.get("/courses/:id", roleAuth('Course', 'read'), courseController.getCourseById);

router.put("/courses/:id", roleAuth('Course', 'update'), courseController.updateCourse);

router.delete("/courses/:id", roleAuth('Course', 'delete'), courseController.deleteCourse);


module.exports = router