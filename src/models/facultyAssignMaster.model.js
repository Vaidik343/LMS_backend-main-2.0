// id UUID PK
// faculty_id UUID FK → faculty
// department_id UUID FK → departments
// course_id UUID FK → courses
// batch_id UUID FK → batches
// semester_id 
// division_id UUID FK → divisions
// subject_id UUID FK → subjects
// academic_year_id UUID FK → academic_years
// is_active BOOLEAN



module.exports = (sequelize, DataTypes) => {
    const FacultyAssignMaster = sequelize.define(
        'FacultyAssignMaster', 
        {
            id: {
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false, 
            },

            faculty_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            department_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            course_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            batch_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            division_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            semester_id : {
                type:DataTypes.UUID,
                allowNull: false 
            },
            subject_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            academic_year_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },

            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },
             
        } , {
             tableName: "faculty_assign_master",
            timestamps: true,
        }
    )

    return FacultyAssignMaster
}
