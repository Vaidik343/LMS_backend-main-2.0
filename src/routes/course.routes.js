const express = require('express');
const router = express.Router();
const {courseController} = require('../controllers/course.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);


router.post("/courses", courseController.createCourse);

router.get("/courses", courseController.getAllCourse)

router.get("/courses/:id", courseController.getCourseById);

router.put("/courses/:id", courseController.updateCourse);

router.delete("/courses/:id", courseController.deleteCourse);


module.exports = router