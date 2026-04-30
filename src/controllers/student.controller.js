const {Student, User} = require("../models");

const createStudent = async (req, res) => {
    try {
        const {user_id,enrollment_no, dob, gender,phone, address} = req.body;

        if(!user_id || !enrollment_no|| !dob|| !gender|| !phone || ! address)
        {
            return res.status(400).json({message:"field required!"});

        }
        
    if (!/^\d{12}$/.test(enrollment_no)) {
      return res.status(400).json({
        message: "Enrollment number must be exactly 12 digits",
      });
    }

        
        const user = await User.findByPk(user_id);

        if(!user)
        {
            return res.status(400).json({message:"Invalid user id"})
        }

        // ✅ Prevent duplicate enrollment
    const exists = await Student.findOne({ where: { enrollment_no } });
    if (exists) {
      return res.status(409).json({
        message: "Enrollment number already exists",
      });
    }
        const student = await Student.create({
            user_id,
            enrollment_no,
            dob : new Date(dob),
            gender,
            phone,
            address ,
            is_active: true
        }) 

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

const getAllStudent = async (req, res) => {
    try {
          const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;

    const where = { is_active: true };

// 🔥 student sees only themselves
// if (req.user.role === "student") {
//   where.user_id = req.user.id;
// }
 // pate this controller again in cloude
     const {count, rows} = await Student.findAndCountAll({
            order:[["id", "ASC"]],
            limit,
            offset,
            where,
                include: [
        {
            model: User,
            attributes: ["id"]
        }
    ] 
        });

        res.status(200).json({message: "List of all Student", data:rows, total:count, page, limit})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

const getStudentById = async (req, res) => {

    const studentId = req.params.id;
    try {
        
        const student = await Student.findByPk(studentId,{
             include: [
        {
            model: User,
            attributes: ["id", "name", "email"]
        }
    ] 
        });
        
        if(!student)
        {
            return res.status(404).json({message:"Not Found!"});
        }

        //prevent student accessing others
if (req.user.role === "student" && student.user_id !== req.user.id) {
  return res.status(403).json({ message: "Forbidden" });
}
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

const updateStudent = async (req,res) => {

    try {
        const studentId = req.params.id;
        const { dob, gender,phone, address} = req.body;
        const student = await Student.findByPk(studentId);
        
        if(!student)
        {
            return res.status(404).json({message:"Not Found!"});
        }
    
        // prevent student accessing others
if (req.user.role === "student" && student.user_id !== req.user.id) {
  return res.status(403).json({ message: "Forbidden" });
}

      const userStudent =  await student.update({
            dob, gender,phone, address
        })

        res.status(200).json(userStudent);
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
     
        const student = await Student.findByPk(studentId);
        
        if(!student)
        {
            return res.status(404).json({message:"Not Found!"});
        }
    
await student.update({ is_active: false });

res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

module.exports.studentController = {
    createStudent , getAllStudent , getStudentById, updateStudent, deleteStudent
}

