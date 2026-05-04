const express = require('express');
const router = express.Router();
const {divisionController} = require('../controllers/division.controller');

const { authenticate } = require('../middleware/authMiddleware');
const { roleAuth } = require('../middleware/roleMiddleware');


router.use(authenticate) 

router.post("/divisions", roleAuth("Division", "create"), divisionController.createDivision);

router.get("/divisions", roleAuth("Division", "read"), divisionController.getAllDivision);

router.get("/divisions/:id", roleAuth("Division", "read"), divisionController.getDivisionById);

router.put("/divisions/:id", roleAuth("Division", "update"), divisionController.updateDivision);

router.delete("/divisions/:id", roleAuth("Division", "delete"), divisionController.deleteDivision);

module.exports = router;
