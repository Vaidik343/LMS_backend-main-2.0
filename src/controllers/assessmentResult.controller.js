const {AssessmentResult, Assessment, Student, sequelize} = require('../models');

// create result in bulk
const createBulkResults = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        // teacher/admin

        if(!["teacher", "admin"]. includes(req.user.role))
        {
            return res.status(403).json({message: "Forbidden"});
        }

        const {assessment_id, results} = req.body;

        if(!assessment_id || !Array.isArray(results) || results.length === 0)
        {
            throw new Error("Assessment id and results array required");
        }

        //validate assessment
        const assessment = await Assessment.findByPk(assessment_id);
        if(!assessment) throw new Error("Invalid Assessment");

        // teacher can only add marks for their assessment

        if(
            req.user.role === "teacher" && assessment.faculty_id !== req.user.id
        ) 
        {
            throw new Error("You can only add results for your assessment");
        }

        //validate students
        const studentIds = results.map(r => r.student_ids);

        const validateStudents = await Student.findAll({
            where: {id: studentIds},
            transaction: t
        });

        if(validateStudents.length !== studentIds.length)
        {
            throw new Error("Invalid Student Ids")
        }

        // validate marks
        const invalid = results.find(
            r => r.marks_obtained === undefined || r.marks_obtained < 0
        );

        if(invalid)
        {
            throw new Error(`Invalid marks for student ${invalid.student_ids}`);
        }

        // prepare date

        const data = results.map(r => ({
            assessment_id,
            stud
        }))

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}