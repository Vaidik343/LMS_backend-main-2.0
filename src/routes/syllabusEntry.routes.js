const express = require("express")
const router = express.Router();

const {syllabusEntryController} = require('../controllers/syllabusEntry.controller');
const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");


router.use(authenticate);

router.post('/syllabus_entries', roleAuth("SyllabusEntry", "create"), syllabusEntryController.createSyllabusEntry);

router.get('/syllabus_entries', roleAuth('SyllabusEntry', 'read'), syllabusEntryController.getAllSyllabusEntries);

router.get('/syllabus_entries/:id', roleAuth('SyllabusEntry', 'read'), syllabusEntryController.getSyllabusEntryById);

router.put('/syllabus_entries/:id', roleAuth('SyllabusEntry', 'update'), syllabusEntryController.updateSyllabusEntry);

router.delete('/syllabus_entries/:id', roleAuth('SyllabusEntry', 'delete'), syllabusEntryController.deleteSyllabusEntry);

module.exports = router;

