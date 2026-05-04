const express = require('express');
const router = express.Router();

const {dashboardController} = require("../controllers/dashboard.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate)  


router.get("/dashboard/student", roleAuth("Dashboard", "read"), dashboardController.getStudentDashboard);

router.get("/dashboard/teacher", roleAuth("Dashboard", "read"), dashboardController.getTeacherDashboard);


module.exports = router