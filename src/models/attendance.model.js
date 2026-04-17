
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define(
        'Attendance',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull:false
            },
            session_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            student_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            is_present: {
                type: DataTypes.BOOLEAN,
                allowNull:false
            },
            remark: {
                type:DataTypes.STRING,
                allowNull: true,
                defaultValue: "none"
            },
             is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },
        },{
            tableName: "attendances",
            timestamps: true,
        }
    )

    return Attendance

} 