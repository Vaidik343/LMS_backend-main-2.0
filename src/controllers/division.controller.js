const {Division, Batch } = require("../models");

    
const createDivision = async (req, res) => {

    try {
        const {name , batch_id} = req.body;

        
        if(!name || !batch_id)
        {
            return res.status(400).json({message:"field required!"});
        }

const batch = await Batch.findByPk(batch_id);

if (!batch) {
    return res.status(404).json({ message: "Invalid Batch" });
}

// duplicate check
        const existing = await Division.findOne({
            where: { name, batch_id }
        });

        if (existing) {
            return res.status(409).json({
                message: "Division already exists in this batch"
            });
        }

        const division = await Division.create({
            name,
            batch_id,
            is_active: true
        })

        res.status(201).json(division);
    } catch (error) {
        console.log("🚀 ~ createDivision ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

const getAllDivision = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page - 1) * limit

        const {count, rows} = await Division.findAndCountAll({
            order:[["name", "DESC"]],
            limit,
            offset,
                include: [
        {
            model: Batch,
            attributes: ["id", "name"]
        }
    ] 
        });

        res.status(200).json({message: "List of all divisions", data:rows, total:count, page, limit})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

    
const getDivisionById = async (req, res) => {
    const divisionId = req.params.id;
    try {
        const division = await Division.findByPk(divisionId)

        if(!division)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        res.status(200).json(division);
    } catch (error) {
        console.log("🚀 ~ getDivisionById ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

    
const updateDivision = async (req, res) => {
    const divisionId = req.params.id;
    try {
        const {name} = req.body;
        const division = await Division.findByPk(divisionId)
        if(!division)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        const updateDivision = await division.update({
            name
        })

        res.status(200).json(updateDivision);
    } catch (error) {
        res.status(500).json({message:'Server Error'})
        console.log("🚀 ~ updateDivision ~ error:", error)
    }

}

const deleteDivision = async (req,res) => {
    const divisionId = req.params.id;
    try {
        
        const division = await Division.findByPk(divisionId)
        if(!division)
        {
            return res.status(404).json({message:"Not Found!"});
        }
         if(division.is_active)
        {
            return res.status(400).json({message:"Cannot delete an active division"});
        }

        await division.update({is_active: false})
        res.status(200).json({message:"Division delete"})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

module.exports = {
    createDivision, getAllDivision, getDivisionById, updateDivision, deleteDivision 
}