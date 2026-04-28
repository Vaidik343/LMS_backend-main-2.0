const {
 Student, StudentProgress, StudentTransfer, Batch, Division,
 sequelize
} = require("../models");

// transfer + sync

const transferStudent = async (req,res ) => {
    const t = await sequelize.transition();
}

try {
    //only admin

    if(req.user.role !== "admin")
    {
        return res.status(403).json({message: "Forbidden"});
    }

    const {
        if(req.user.)
    }
} catch (error) {
    
}