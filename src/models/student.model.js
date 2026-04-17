module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define(
        'Students',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull:false,
            },
            user_id: {
                type:DataTypes.UUID,
                allowNull:false, 
            },
            enrollment_no: {
                type:DataTypes.STRING,
                allowNull:false,
                unique:true
            },
           
            dob: {
                type:DataTypes.DATEONLY, 
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM("male", "female", "other"),
                allowNull:false, 
            },
            phone: {
                type:DataTypes.STRING,
                allowNull:false,
            },
            address: {
                type:DataTypes.TEXT,
                allowNull:false
            },
            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },
        },
        {
            tableName: "students",
            timestamps: true,
        }
    )
   return Students
}