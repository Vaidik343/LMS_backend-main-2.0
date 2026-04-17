// id UUID PK
// faculty_id UUID FK → faculty
// subject_id UUID FK → subjects
// batch_id UUID FK → batches
// division_id UUID FK → divisions
// semester_id UUID FK → semesters
// academic_year_id UUID FK → academic_years
// title STRING e.g. "Unit Test 1", "Quiz 2"
// assessment_type ENUM quiz, unit_test, practical, viva, assignment
// total_marks INTEGER
// assessment_date DATEONLY
// is_active BOOLEAN

module.exports = (sequelize, DataTypes) => {
    const Assessment = sequelize.define(
        'Assessment', 
        {
            id: {
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            faculty_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            subject_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            batch_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            division_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            semester_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            academic_year_id:{
                type: DataTypes.UUID,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull:false
                
            },
            assessment_type: {
                type: DataTypes.ENUM("quiz", "unit_test", "practical", "viva", "assignment"),
                allowNull:false
            },
            total_marks: {
            type:DataTypes.INTEGER,
            allowNull:false
            },
            assessment_date: {
                type: DataTypes.DATEONLY,
                allowNull:false
            },
             is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },

        },
        {
            tableName: "assessments",
            timestamps: true,
        }
    )

    return Assessment
}