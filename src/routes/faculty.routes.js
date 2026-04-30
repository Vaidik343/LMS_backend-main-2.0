const express = require('express');
const router = express.Router();

const {facultyController} = require('../controllers/faculty.controller')
const {authenticate} = require('../middleware/authMiddleware');
const {roleAuth} = require('../middleware/roleMiddleware');

router.use(authenticate);

router.post('/faculty', roleAuth('Faculty', 'create'), facultyController.createFaculty);

router.get('/faculty', roleAuth('Faculty', 'read'), facultyController.getAllFaculty);

router.get('/faculty/:id', roleAuth('Faculty', 'read'), facultyController.getFacultyById);

router.put('/faculty/:id', roleAuth("Faculty", 'update'), facultyController.updateFaculty);

router.delete('/faculty/:id', roleAuth('Faculty', 'delete'), facultyController.deleteFaculty);

module.exports = router

