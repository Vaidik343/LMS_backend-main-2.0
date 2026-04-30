const express = require('express');
const router = express.Router();
const {batchController} = require('../controllers/batch.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);


router.post("/batches", roleAuth('Batch', 'create'), batchController.createBatchYear);

router.get("/batches", roleAuth('Batch', 'read'), batchController.getAllBatches);

router.get("/batches/:id", roleAuth('Batch', 'read'), batchController.getBatchById);

router.put("/batches/:id", roleAuth('Batch', 'update'), batchController.updateBatch);

router.delete("/batches/:id", roleAuth('Batch', 'delete'), batchController.deleteBatch)

module.exports = router;

