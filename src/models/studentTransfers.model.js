// id UUID PK
// student_id UUID FK → students
// from_semester_id UUID FK → semesters
// to_semester_id UUID FK → semesters
// from_batch_id UUID FK → batches
// to_batch_id UUID FK → batches
// transfer_date DATEONLY
// remarks TEXT
// is_active BOOLEAN


module.exports = (sequelize, DataTypes) => {
    const StudentTransfers = sequelize.define(
        'StudentTransfers',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            student_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            from_semester_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            to_semester_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            from_batch_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            to_batch_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            transfer_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
                     remark: {
                type: DataTypes.TEXT,
                allowNull: true
            },
             is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },

        },
        {
            tableName: "student_transfers",
            timestamps: true,
        }
    )

    return StudentTransfers

}