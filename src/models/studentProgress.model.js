// id UUID PK
// student_id UUID FK → students
// batch_id UUID FK → batches
// division_id UUID FK → divisions
// semester_id UUID FK → semesters
// academic_year_id UUID FK → academic_years
// is_active BOOLEAN

module.exports = (sequelize, DataTypes) => {
    const StudentProgress = sequelize.define(
        'StudentProgress',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false 
            },
            student_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            batch_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            division_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            semester_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            academic_year_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },

        }, {
             tableName: "students_progress",
            timestamps: true,
        }
    )
    return StudentProgress

}