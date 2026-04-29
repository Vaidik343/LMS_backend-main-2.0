const {AcademicYear} = require('../models')

//create

    
const createAcademicYear = async (req, res) => {
    try {
        const {label, start_date, end_date} = req.body;

        if(!label || !start_date || !end_date)
        {
            return res.status(400).json({message:"All field required!"})
        }


        if (new Date(start_date) >= new Date(end_date)) {
    return res.status(400).json({ message: "Start date must be before end date" });
}

        const existing = await AcademicYear.findOne({
            where: {label}
        })

        if(existing)
        {
            return res.status(409).json({message:"Already exist"})
        }

        const academicYear = await AcademicYear.create({
            label, start_date, end_date,
            is_active: false,
        });

        res.status(200).json({message:"Academic year created!", academicYear})
    } catch (error) {
        console.log("🚀 ~ createAcademicYear ~ error:", error)
        res.status(500).json({message:'Server Error'})
        
    }

}

//get all
    
const getAllAcademicYear = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page - 1) * limit

        const {count , rows} = await AcademicYear.findAndCountAll({
            order:[["start_date", "DESC"]],
            limit,
            offset
        });
        
         res.status(200).json({message:"List of all academic year!", data: rows, total: count, page, limit})
    } catch (error) {
        console.log("🚀 ~ getAllAcademicYear ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

// get by id 


const getAcademicYearById = async (req, res) => {

    try {
        const academicId = req.params.id
        const academicYear = await AcademicYear.findByPk(
            
                 academicId
            
        )

        if(!academicYear)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        res.status(200).json(academicYear )
    } catch (error) {
            console.log("🚀 ~ getAcademicYearById ~ error:", error)
            res.status(500).json({message:'Server Error'})
    }

}

//update

    
const updateAcademicYear = async (req, res) => {
    try {
        const academicId = req.params.id
        const {label, start_date, end_date} = req.body;

        const academicYear = await AcademicYear.findByPk(
                 academicId
        )
         if(!academicYear)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        await academicYear.update({ label, start_date, end_date });
        res.status(200).json({message:"Academic Year Updated!"})
    } catch (error) {
        console.log("🚀 ~ updateAcademicYear ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

//soft delete 

const deleteAcademicYear = async (req, res) => {
    try {
        const academicId = req.params.id

        const academicYear = await AcademicYear.findByPk(
             
             academicId
            

        )
         if(!academicYear)
        {
            return res.status(404).json({message:"Not Found!"});
        }
         if(academicYear.is_active)
        {
            return res.status(400).json({message:"Cannot delete an active academic year"});
        }

        await academicYear.update({is_active: false})
        res.status(200).json({message:"Academic Year Deleted!"})
    } catch (error) {
        console.log("🚀  ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

const setActiveAcademicYear = async (req, res) => {
    try {
        const academicId = req.params.id

        const academicYear = await AcademicYear.findByPk(
           academicId
        );

          if(!academicYear)
        {
            return res.status(404).json({message:"Not Found!"});
        }
        // deactivate all others first
        await AcademicYear.update({ is_active: false }, { where: {} });
await academicYear.update({ is_active: true });
              res.status(200).json({message:"Academic Year set as active successfully"})
    } catch (error) {
            res.status(500).json({message:'Server Error'})
    }

}

module.exports.academicYearController = {
    createAcademicYear, getAllAcademicYear, getAcademicYearById, updateAcademicYear, setActiveAcademicYear, deleteAcademicYear
}