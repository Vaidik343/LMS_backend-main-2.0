const {AssessmentResult, Assessment, Student, sequelize} = require('../models');

// create result in bulk
const createBulkResults = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        // teacher/admin

        // if(!["teacher", "admin"]. includes(req.user.role))
        // {
        //     return res.status(403).json({message: "Forbidden"});
        // }

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
            student_id: r.student_id,
            marks_obtained: r.marks_obtained,
            remark: r.remark || null,
            is_active: true
        }));

        //upsert (important)
        await AssessmentResult.bulkCreate(data, {
            transaction: t,
            updateOnDuplicate: ["marks_obtained", "remark", "is_active"]
        });

        await t.commit();

        res.status(200).json({
            message:"Result saved successfully",
            count: data.length
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

const getAllResults = async (req, res) => {
    try {
        const {student_id, assessment_id} = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const offset = (page - 1) * limit;

        const where = {is_active: true};

        //student restriction
        if(req.user.role === "student")
        {
            where.student_id = req.user.id;
        }

        //teacher restriction (only their assessments)
        if(req.user.role === "teacher")
        {
            where.assessment_id = {
                [require("sequelize").Op.in]: (
                    await Assessment.findAll({
                        where: {faculty_id: req.user.id},
                        attributes:["id"]
                    })
                ).map(a =>a.id)
            };
        }

        //filter
        if(student_id) where.student_id = student_id;
        if(assessment_id) where.assessment_id = assessment_id;

        const {count, rows} = await AssessmentResult.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {model: Student, attributes: ["id", "name"]},
                {model: Assessment}
            ]
        });

        res.status(200).json({
            data: rows,
            total: count,
            page,
            limit 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

const getResultById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await AssessmentResult.findByPk(id, {
            include: [
                {
                    model: Student
                },
                {
                    model: Assessment
                }
            ]
        });

        if(!result)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        // student restriction
        if(req.user.role === "student" && result.student_id !== req.user.id)
        {
            return res.status(403).json({message: "Forbidden"});
        }

        res.status(200).json(result);
    } catch (error) {
           await t.rollback()
        res.status(500).json({ message: "Server Error" });
    }

}

const updateResult = async (req, res) => {
    try {
        const id = req.params.id;
        const {marks_obtained, remark} = req.body;

        const result = await AssessmentResult.findByPk(id, {
            include: [{model: Assessment}]
        });

        if(!result)
        {
            return res.status(404).json({message: "Not Found!"});
        }

        // teacher restriction
        if(req.user.role === "teacher" && result.Assessment.faculty_id !== req.user.id)
        {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        await result.update({marks_obtained, remark});

        res.status(200).json({message: "Update successfully"});
    } catch (error) {
           await t.rollback()
        res.status(500).json({ message: "Server Error" });
    }

}

const deleteResult = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await AssessmentResult.findByPk(id);

        if(!result)
        {
            return res.status(404).json({message: "Not Found!"});
        }
          

        // if(!["admin", "teacher"].includes(req.user.role))
        // {
        //     return res.status(403).json({message:"Forbidden"});
        // }

        await result.update({is_active: false});

        res.status(200).json({message: "Delete successfully"});
    } catch (error) {
           await t.rollback()
        res.status(500).json({ message: "Server Error" });
    }

}


module.exports.assessmentResultController = {
    createBulkResults, getAllResults, getResultById, updateResult, deleteResult
}

