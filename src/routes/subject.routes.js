const express = require('express');
const router = express.Router();
const {subjectController} = require('../controllers/subject.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/subjects", roleAuth("Subject", "create"), subjectController.createSubject);

router.get("/subjects", roleAuth("Subject", "read"), subjectController.getAllSubject);

router.get("/subjects/:id", roleAuth("Subject", "read"), subjectController.getSubjectById);

router.put("/subjects/:id", roleAuth("Subject", "update"), subjectController.updateSubject);

router.delete("/subjects/:id", roleAuth("Subject", "delete"), subjectController.deleteSubject);

module.exports = router;