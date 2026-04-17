module.exports = (sequelize, DataTypes) => {

    const ClinicalDetails = sequelize.define(
        'ClinicalDetails',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,

            },
            session_id : {
                type: DataTypes.UUID,
                allowNull: false
            },
            clinical_type: {
               type:DataTypes.ENUM("ward_round", "opd", "case_study"),
               allowNull: false
            },
            case_description: {
                type:DataTypes.TEXT,
                allowNull:true
            },
            patient_category: {
                type: DataTypes.STRING,
                allowNull:true,
            },
            ward_name: {
                type: DataTypes.STRING,
                allowNull:true 
            }, 
             is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },
        }, {
            tableName: "clinical_details",
            timestamps: true,
        }
    )

    return ClinicalDetails
}