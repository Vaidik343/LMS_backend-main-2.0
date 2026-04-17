const { Chapter, SyllabusEntry } = require('../models');

// allowed enum values
const ALLOWED_CONTENT_TYPES = [
    "theoretical",
    "case_based",
    "practical",
    "ward_round"
]; 


// CREATE
const createSyllabusEntry = async (req, res) => {
    try {
        const { chapter_id, content_type, description } = req.body;

        // validation
        if (!chapter_id || !content_type) {
            return res.status(400).json({
                message: "chapter_id and content_type are required!"
            });
        }

        // enum validation
        if (!ALLOWED_CONTENT_TYPES.includes(content_type)) {
            return res.status(400).json({
                message: "Invalid content_type"
            });
        }

        // FK validation
        const chapter = await Chapter.findByPk(chapter_id);
        if (!chapter) {
            return res.status(404).json({
                message: "Invalid Chapter"
            });
        }

        // duplicate check (business rule)
        const existing = await SyllabusEntry.findOne({
            where: {
                chapter_id,
                content_type
            }
        });

        if (existing) {
            return res.status(409).json({
                message: "Syllabus entry already exists for this chapter and content type"
            });
        }

        const syllabusEntry = await SyllabusEntry.create({
            chapter_id,
            content_type,
            description,
            is_active: true
        });

         res.status(201).json(syllabusEntry);

    } catch (error) {
        console.log("CREATE SYLLABUS ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// GET ALL
const getAllSyllabusEntries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const offset = (page - 1) * limit;

        const { count, rows } = await SyllabusEntry.findAndCountAll({
            order: [["id", "ASC"]],
            limit,
            offset
        });

        return res.status(200).json({
            message: "Syllabus entries fetched successfully",
            data: rows,
            total: count,
            page,
            limit
        });

    } catch (error) {
        console.log("GET ALL SYLLABUS ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// GET BY ID
const getSyllabusEntryById = async (req, res) => {
    try {
        const syllabusEntryId = req.params.id;

        const syllabusEntry = await SyllabusEntry.findByPk(syllabusEntryId);

        if (!syllabusEntry) {
            return res.status(404).json({
                message: "Syllabus Entry not found"
            });
        }

        return res.status(200).json({
            message: "Syllabus Entry found",
            data: syllabusEntry
        });

    } catch (error) {
        console.log("GET BY ID ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// UPDATE
const updateSyllabusEntry = async (req, res) => {
    try {
        const syllabusEntryId = req.params.id;
        const { content_type, description } = req.body;

        const syllabusEntry = await SyllabusEntry.findByPk(syllabusEntryId);

        if (!syllabusEntry) {
            return res.status(404).json({
                message: "Syllabus Entry not found"
            });
        }

        // enum validation
        if (content_type && !ALLOWED_CONTENT_TYPES.includes(content_type)) {
            return res.status(400).json({
                message: "Invalid content_type"
            });
        }

        await syllabusEntry.update({
            content_type,
            description
        });

        return res.status(200).json({
            message: "Syllabus Entry updated successfully",
            data: syllabusEntry
        });

    } catch (error) {
        console.log("UPDATE SYLLABUS ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// DELETE (soft delete)
const deleteSyllabusEntry = async (req, res) => {
    try {
        const syllabusEntryId = req.params.id;

        const syllabusEntry = await SyllabusEntry.findByPk(syllabusEntryId);

        if (!syllabusEntry) {
            return res.status(404).json({
                message: "Syllabus Entry not found"
            });
        }

        if (!syllabusEntry.is_active) {
            return res.status(400).json({
                message: "Syllabus Entry already inactive"
            });
        }

        await syllabusEntry.update({ is_active: false });

        return res.status(200).json({
            message: "Syllabus Entry deactivated successfully"
        });

    } catch (error) {
        console.log("DELETE SYLLABUS ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// SET ACTIVE
const setActiveSyllabusEntry = async (req, res) => {
    try {
        const syllabusEntryId = req.params.id;

        const syllabusEntry = await SyllabusEntry.findByPk(syllabusEntryId);

        if (!syllabusEntry) {
            return res.status(404).json({
                message: "Syllabus Entry not found"
            });
        }

        await syllabusEntry.update({ is_active: true });

        return res.status(200).json({
            message: "Syllabus Entry activated successfully"
        });

    } catch (error) {
        console.log("SET ACTIVE SYLLABUS ERROR:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    createSyllabusEntry,
    getAllSyllabusEntries,
    getSyllabusEntryById,
    updateSyllabusEntry,
    deleteSyllabusEntry,
    setActiveSyllabusEntry
};