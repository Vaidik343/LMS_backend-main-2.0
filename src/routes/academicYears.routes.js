const express = require('express');
const router = express.Router();
const {academicYearController} = require('../controllers/academicYear.controller');
const {authenticate} = require("../middleware/authMiddleware")
const {roleAuth} = require("../middleware/roleMiddleware");

router.use(authenticate);

router.post("/academic_years",  roleAuth('AcademicYear', 'create'), academicYearController.createAcademicYear);


router.get("/academic_years",  roleAuth('AcademicYear', 'read') ,academicYearController.getAllAcademicYear);

router.get("/academic_years/:id", roleAuth('AcademicYear', 'read'), academicYearController.getAcademicYearById);

router.put("/academic_years/:id", roleAuth('AcademicYear', 'update'), academicYearController.updateAcademicYear);


router.delete("/academic_years/:id",  roleAuth('AcademicYear', 'delete'), academicYearController.deleteAcademicYear);


router.patch("/academic_years/:id/set-active",  roleAuth('AcademicYear', 'setActive'), academicYearController.setActiveAcademicYear);

module.exports = router;

  