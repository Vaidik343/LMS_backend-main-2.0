const {Chapter, Subject} = require('../models')

//create

    
const createChapter = async (req, res) => {
    try {
        const {subject_id, title, order_index} = req.body;

        if(! subject_id || !title || !order_index)
        {
            return res.status(400).json({message:"All field required!"})
        }

        const existing = await Chapter.findOne({
            where: {title, subject_id}
        })

        if(existing)
        {
            return res.status(409).json({message:"Already exist"})
        }

 
const subject = await Subject.findByPk(subject_id);

if (!subject) {
    return res.status(404).json({ message: "Invalid Subject" });
}

        const chapter = await Chapter.create({
            subject_id, title, order_index,
            is_active: true
        });

        res.status(200).json(chapter)
    } catch (error) {
        
        res.status(500).json({message:'Server Error'})
        
    }

}

//get all
    
const getAllChapters = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const offset = (page - 1) * limit

        const {count , rows} = await Chapter.findAndCountAll({
            order:[["order_index", "ASC"]],
            limit,
            offset
        });
        
         res.status(200).json({ data: rows, total: count, page, limit})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

// get by id 


const getChapterById = async (req, res) => {
    
    try {
        const chapterId = req.params.id
        const chapter = await Chapter.findByPk(
            chapterId
        )
        
        if(!chapter)
            {
                return res.status(404).json({message:"Not Found!"});
            }
            
            res.status(200).json({message:"Chapter Found",chapter})
        } catch (error) {
            
            console.log("🚀 ~ getChapterById ~ error:", error)
            res.status(500).json({message:'Server Error'})
    }

}

//update

    
const updateChapter = async (req, res) => {
    try {
        const chapterId = req.params.id
        const { title, order_index} = req.body;

        const chapter = await Chapter.findByPk(
            chapterId
        )
        
        if(!chapter)
            {
                return res.status(404).json({message:"Not Found!"});
            }

            if (!chapter.is_active) {
  return res.status(400).json({ message: "Cannot update inactive chapter" });
}
if (title === undefined && order_index === undefined) {
  return res.status(400).json({ message: "Nothing to update" });
}
       const chapterUpdate =  await chapter.update({  title, order_index });
        res.status(200).json({message:"Chapter Updated!", chapterUpdate})
    } catch (error) {
        console.log("🚀 ~ update chapter", error)
        res.status(500).json({message:'Server Error'})
    }

}

//soft delete 

const deleteChapter = async (req, res) => {
    try {
        const chapterId = req.params.id

        
        const chapter = await Chapter.findByPk(
            chapterId
        )
        
        if(!chapter)
            {
                return res.status(404).json({message:"Not Found!"});
            }
         if (!chapter.is_active) {
  return res.status(400).json({ message: "Chapter already inactive" });
}

await chapter.update({ is_active: false });

res.status(200).json({ message: "Chapter deactivated successfully" });
    } catch (error) {
        console.log("🚀  ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

const setActiveChapter = async (req, res) => {
    try {
        const chapterId = req.params.id

        
        const chapter = await Chapter.findByPk(
            chapterId
        )
        
        if(!chapter)
            {
                return res.status(404).json({message:"Not Found!"});
            }

        // deactivate all others first
        // await academicYear.update({ is_active: false }, { where: {} });
await chapter.update({ is_active: true });
              res.status(200).json({message:"chapter set as active successfully"})
    } catch (error) {
            res.status(500).json({message:'Server Error'})
    }

}

module.exports = {
    createChapter, getAllChapters, getChapterById, updateChapter, deleteChapter, setActiveChapter
}