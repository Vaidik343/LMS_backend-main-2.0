const express = require("express");
const router = express.Router();

const {assessmentResultController} = require("../controllers/assessmentResult.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate)  


router.post("/assessment_results", roleAuth("AssessmentResult","create"), assessmentResultController.createBulkResults);

router.get("/assessment_results", roleAuth("AssessmentResult","read"), assessmentResultController.getAllResults);

router.get("/assessment_results/:id", roleAuth("AssessmentResult","read"),assessmentResultController.getResultById);

router.put("/assessment_results/:id", roleAuth("AssessmentResult","update"),assessmentResultController.updateResult);

router.delete("/assessment_results/:id", roleAuth("AssessmentResult","delete"), assessmentResultController.deleteResult);


module.exports = router;
