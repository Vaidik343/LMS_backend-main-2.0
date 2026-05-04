const express = require("express");
const router = express.Router();

const {sessionController} = require("../controllers/sessions.controller")

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/sessions", roleAuth("Session", "create"), sessionController.createSession);

router.get("/sessions", roleAuth("Session", "read"), sessionController.getAllSessions);

router.get("/sessions/:id", roleAuth("Session", "read"), sessionController.getSessionById); 

router.put("/sessions/:id", roleAuth("Session", "update"), sessionController.updateSession);

router.delete("/sessions/:id", roleAuth("Session", "delete"), sessionController.deleteSession);

module.exports = router;