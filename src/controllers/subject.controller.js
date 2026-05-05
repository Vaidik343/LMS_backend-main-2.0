const { Subject, Semester, Chapter, Course } = require("../models");

const createSubject = async (req, res) => {
    try {
        const { name, code, description, semester_id } = req.body;

        if (!name || !code || !semester_id) {
            return res.status(400).json({ message: "field required!" });
        }

        //FK validation
        const semester = await Semester.findByPk(semester_id);
        if (!semester) {
            return res.status(404).json({
                message: "Invalid Semester"
            })
        }

        // Duplicate check (same subject in same semester)

        const existing = await Subject.findOne({
            where: {
                semester_id,
                code
            }
        });

        if (existing) {
            return res.status(409).json({
                message: "Subject already exists in this semester"
            })
        }

        const subject = await Subject.create({
            name, code, description, semester_id, is_active: true
        })

        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
          console.log("subject error", error)
    }

}


//get all subject with associated table
const getAllSubject = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page - 1) * limit
        

        const { count, rows } = await Subject.findAndCountAll({
            order: [["name", "ASC"]],
            limit,
            offset,
            
            include: [
                {
                    model: Semester,
                    attributes: ["id", "label"]
                },
                
            ]
        })

        res.status(200).json({
            data: rows, total: count, page, limit
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
        console.log("get all subject", error)
    }

}


//get subject by id with deep association

const getSubjectById = async (req, res) => {
    try {
        const subjectId = req.params.id;
        const subject = await Subject.findByPk(subjectId, {
            include: [
                {
                    model: Semester,
                    attributes: ["id", "number", "label"]
                },
                // {
                //     model: Chapter,
                //     attributes: ["id", "title", "order_index"]
                // }, no need for this
            ]
        });

        if (!subject) {
            return res.status(404).json({ message: "Not Found!" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}


// update subject
const updateSubject = async (req, res) => {
    const subjectId = req.params.id;
    try {
        const { name, code, description } = req.body || {};
        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Not Found!" });
        }

        const updateSubject = await subject.update({ name, code, description })
        res.status(200).json(updateSubject)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;
    try {
        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Not Found!" });
        }
        //    if (!subject.is_active) {
        //     return res.status(400).json({
        //         message: "Subject already inactive"
        //     });
        // }
        await subject.update({ is_active: false });

        // message 'deactive' in all controller
        res.status(200).json({ message: "Subject deleted!" })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })

    }

}

const setActiveSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({
                message: "Subject not found"
            });
        }

        await subject.update({ is_active: true });

        return res.status(200).json({
            message: "Subject activated successfully"
        });

    } catch (error) {
        console.log("SET ACTIVE SUBJECT ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


module.exports.subjectController = {
    createSubject, getAllSubject, updateSubject, deleteSubject, getSubjectById, setActiveSubject
}