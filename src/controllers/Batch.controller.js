const {Batch} = require('../models')

//create
    
const createBatchYear = async (req,res) => {
    try {
        const {name ,  course_id, academic_year_id} = req.body;

        if(!name || !course_id || !academic_year_id)
        {
            return res.status(400).json({message:"field required!"});
        }

        const batch = await Batch.create({
            name ,  course_id, academic_year_id , is_active:true
        })

        res.status(200).json(batch);
    } catch (error) {
        console.log("🚀 ~ createBatchYear ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }
}

    
const getAllBatches = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page -1) * limit 

        const {count, rows} = await Batch.findAndCountAll({
            order:[["name", "ASC"]],
            limit,
            offset
        })

        res.status(200).json({message:"List of All Batches", data: rows, total: count, page, limit})
    } catch (error) {
        console.log("🚀 ~ getAllBatches ~ error:", error)
        res.status(500).json({message:"Server Error"})
    }
}


const getBatchById = async (req, res) => {
    try {
        const batchId = req.params.id;
        const batch = await Batch.findByPk(batchId);

        if(!batch)
        {
            return res.status(404).json({message: "Not Found!"})
        }

        res.status(200).json(batch)
    } catch (error) {
            console.log("🚀 ~ getBatchById ~ error:", error)
            res.status(500).json({message:"Server Error"})
    }
}


const updateBatch = async (req, res) => {
    try {
        const batchId = req.params.id;
        const batch = await Batch.findByPk(batchId);
        const {name } = req.body || {};

        if(!batch)
        {
            return res.status(404).json({message: "Not Found!"})
        }

       const batchUpdate = await batch.update({name})
        res.status(200).json(batchUpdate)
    } catch (error) {
            console.log("🚀 ~ updateBatch ~ error:", error)
        res.status(500).json({message:"Server Error"})
    }

}

    
const deleteBatch = async (req, res) => {
    try {
         const batchId = req.params.id;
        const batch = await Batch.findByPk(batchId);

        if(!batch)
        {
            return res.status(404).json({message: "Not Found!"})
        }
        if(batch.is_active)
        {
             return res.status(400).json({message:"Cannot delete an active batch"});
        }
        await batch.update({is_active: false});
        res.status(200).json({message:"Batch Deactivated!"})

    } catch (error) {
console.log("🚀 ~ deleteBatch ~ error:", error)
        res.status(500).json({message:"Server Error"})
    }

} 

// no need for this function
// const setActiveBatch = async (req, res) => {
//     try {
//         const batchId = req.params.id

//         const batch = await Batch.findByPk(
//            batchId
//         );

//           if(!batch)
//         {
//             return res.status(404).json({message:"Not Found!"});
//         }
//         // deactivate all others first
//         await Batch.update({ is_active: false }, { where: {} });
// await batch.update({ is_active: true });
//               res.status(200).json({message:"Batch set as active successfully"})
//     } catch (error) {
//             res.status(500).json({message:'Server Error'})
//     }

// }


module.exports = {
    createBatchYear, getAllBatches, getBatchById, updateBatch, deleteBatch ,
}                        