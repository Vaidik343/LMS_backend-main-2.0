const express = require('express');
const router = express.Router();

const {assessmentController} = require("../controllers/assessment.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate)  

router.post('/assessments', roleAuth("Assessment", "create"), assessmentController.createAssessment);

router.get('/assessments', roleAuth("Assessment", "read"), assessmentController.getAllAssessment);

router.get("/assessments/:id", roleAuth("Assessment", "read"), assessmentController.getAssessmentById);

router.put("/assessments/:id", roleAuth("Assessment", "update"), assessmentController.updateAssessment)

router.delete("/assessments/:id", roleAuth("Assessment", "delete"), assessmentController.deleteAssessment);


module.exports = router;