const express = require('express');
const router = express.Router();
const {chapterController} = require('../controllers/chapter.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/chapters", roleAuth("Chapter", "create"), chapterController.createChapter);

router.get("/chapters", roleAuth("Chapter", "read"), chapterController.getAllChapters);

router.get("/chapters/:id",roleAuth("Chapter", "read") ,chapterController.getChapterById);

router.put("/chapters/:id",roleAuth("Chapter", "update"), chapterController.updateChapter);

router.delete("/chapters/:id",roleAuth("Chapter", "delete"), chapterController.deleteChapter);

module.exports = router;