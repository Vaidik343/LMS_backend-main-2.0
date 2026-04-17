// id UUID PK
// assessment_id UUID FK → assessments
// student_id UUID FK → students
// obtained_marks INTEGER
// remarks TEXT
// is_active BOOLEAN

module.exports = (sequelize, DataTypes) => {
    const AssessmentResult = sequelize.define(
        'AssessmentResult',
        {
             id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull:false
            },
            assessment_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            
            student_id: {
                type: DataTypes.UUID,
                allowNull: false
            },

            obtained_marks: {
                type: DataTypes.INTEGER,
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

        }, {
            tableName: "assessment_results",
            timestamps: true,
        }
    )

    return AssessmentResult
}