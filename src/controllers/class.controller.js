
const {Class, Course } = require('../models');

// create
   
const createClass = async (req,res) => {
   try {
    const {name, code , duration_years, description} = req.body;

    if(!name || !code || !duration_years )
    {
        return res.status(400).json({message:" Field required!"});
    }

    if (isNaN(duration_years) || duration_years <= 0) {
    return res.status(400).json({
        message: "Duration must be a positive number"
    });
}
    const existing = await Class.findOne({
        where : {name} 
    })

    if(existing)
    {
        return res.status(409).json({message:"Already Exist!"})
    }

    const existingCode = await Class.findOne({ where: { code } })
if (existingCode) {
  return res.status(409).json({ message: "Class with this code already exists" })
}


    const classCreate = await Class.create({
        name, code, duration_years, description, is_active:true
    })

    res.status(200).json(classCreate)
   } catch (error) {
    console.log("🚀 ~ createClass ~ error:", error)
      res.status(500).json({message:'Server Error'})
   }
}

// get all

    
const getAllClass = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const {count, rows} = await Class.findAndCountAll({
            order:[["name", "ASC"]],
            limit,
            offset,
            
        });

        res.status(200).json({message:"List of All Class", data: rows, total: count, page, limit})
    } catch (error) {
        console.log("🚀 ~ getAllClass ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

//get by id

const getClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const classById = await Class.findByPk(classId);
        
        if(!classById)
        {
            return res.status(404).json({message:"Not Found!"}); 
        }

        res.status(200).json(classById);
    } catch (error) {
         res.status(500).json({message:'Server Error'})
    console.log("🚀 ~ getClassById ~ error:", error)
    }
}

//update

const updateClass = async (req,res) => {
    try {
            const {name, code , duration_years, description} = req.body;
        const classId = req.params.id 
             const classUpdate = await Class.findByPk(classId);
              if(!classUpdate)
        {
             return res.status(404).json({message:"Not Found"})
        }

        await classUpdate.update({name, code , duration_years, description})
        res.status(200).json(classUpdate)
    } catch (error) {
         res.status(500).json({message:'Server Error'})
         
    console.log("🚀 ~ updateClass ~ error:", error)
    }

}

//delete

const deleteClass = async (req,res) => {
    try {
        const classId = req.params.id 
         const classDelete = await Class.findByPk(classId);

        if(!classDelete)
        {
             return res.status(404).json({message:"Not Found"})
        }
        //  if(classDelete.is_active)
        // {
        //     return res.status(400).json({message:"Cannot delete an active class"});
        // }

          await classDelete.update({is_active: false})
          res.status(200).json(classDelete)
    } catch (error) {
         res.status(500).json({message:'Server Error'})
    console.log("🚀 ~ deleteClass ~ error:", error)
    }
}




module.exports.classController = {
    createClass, getAllClass, getClassById, updateClass,deleteClass, 
}