const {Course, Department, Class } = require('../models')

   
const createCourse = async (req, res) => {

    try {
       const {name, code , description,  department_id, class_id} = req.body;



        if(!name || !code ||  !department_id || !class_id)
        {
            return res.status(400).json({message:"field required!"});
        }

        const department = await Department.findByPk(department_id);
if (!department) {
    return res.status(404).json({ message: "Invalid Department" });
}

const classData = await Class.findByPk(class_id);
if (!classData) {
    return res.status(404).json({ message: "Invalid Class" });
}

const existing = await Course.findOne({ where: { code } })
if (existing) {
  return res.status(409).json({ message: "Course with this code already exists" })
}
       const courses = await Course.create({
        name,code ,description, department_id, class_id, is_active:true
       })

       res.status(201).json(courses);
    } catch (error) {
         console.log("🚀 ~ createCourses ~ error:", error)
         res.status(500).json({message:'Server Error'})
    }
 
}


const getAllCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20
        const  offset = (page - 1) * limit

        const {count, rows} = await Course.findAndCountAll({
             include: [
        { model: Department, as: 'department' },
        { model: Class, as: 'class' }
    ],
            order:[["name", "ASC"]],
            limit,
            offset
        });

        res.status(200).json({message:"List of All Courses", data: rows, total: count, page, limit})
    } catch (error) {
    console.log("🚀 ~ getAllCourses ~ error:", error)
    res.status(500).json({message:'Server Error'})
    }
}

    
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByPk(courseId,{
             include: [
        { model: Department, as: 'department' },
        { model: Class, as: 'class' }
    ]
        });

        // const course = await Course.findOne({
        //     where: {
        //         id: courseId
        //     }
        // })

        if(!course)
        {
            return res.status(404).json({message:"Not Found!"})
        }

        res.status(200).json({message:"Course Found", course})
    } catch (error) {
        console.log("🚀 ~ getByIdCourses ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

//update

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const {name, code , description} = req.body;
        const course = await Course.findByPk(courseId);

        if(!course)
        {
            return res.status(404).json({message:"Not Found!"})
        }
       

        await course.update({name, code , description});
        res.status(200).json({ message: "Course updated!" , course}) 
        
    } catch (error) {
        console.log("🚀 ~ deleteCourse ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}



const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByPk(courseId);

        if(!course)
        {
            return res.status(404).json({message:"Not Found!"})
        }
        if(course.is_active)
        {
            return res.status(400).json({message:"Cannot delete an active Course"});
        }

        await course.update({is_active : false});
        res.status(200).json({ message: "Course deleted!" }) 
        
    } catch (error) {
        console.log("🚀 ~ deleteCourse ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

    
// const setActiveCourse = async (req, res) => {

//     try {
//          const courseId = req.params.id;
//         const course = await Course.findByPk(courseId);

//         if(!course)
//         {
//             return res.status(404).json({message:"Not Found!"})
//         }
//         await course.update({is_active:true});
//         res.status(200).json({ message: "Course set as active successfully" })
//     } catch (error) {
//         console.log("🚀 ~ setActiveCourse ~ error:", error)
//         res.status(500).json({message:'Server Error'})
//     }

// }

module.exports.courseController = {
    createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse,
}