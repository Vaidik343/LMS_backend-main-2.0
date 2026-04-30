const express = require('express');
const router = express.Router();

const { classController } = require('../controllers/class.controller');
const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/classes", roleAuth('Class', 'create') ,classController.createClass);

router.get("/classes", roleAuth('Class', 'read') , classController.getAllClass);

router.get("/classes/:id", roleAuth('Class', 'read') , classController.getClassById);

router.put("/classes/:id", roleAuth('Class', 'update') , classController.updateClass);

router.delete("/classes/:id", roleAuth("Class", 'delete'), classController.deleteClass);


module.exports = router;