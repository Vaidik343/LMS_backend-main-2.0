const express = require("express");
const router = express.Router();

const {studentTransferController} = require("../controllers/studentTransfer.controller");

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate)  
router.get("/student_transfers/history", roleAuth("StudentTransfer", "read"),studentTransferController.getStudentFullHistory );

router.get("/student_transfer/:id/history/", roleAuth("StudentTransfer", "read"),studentTransferController.getTransferHistory);

router.post("/student_transfers/",roleAuth("StudentTransfer", "create"), studentTransferController.transferStudent);

module.exports = router;

