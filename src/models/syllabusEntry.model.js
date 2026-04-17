module.exports = (sequelize, DataTypes) => {
    const syllabusEntries = sequelize.define(
        'syllabusEntries', {
            id: {
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false 
            },
            chapter_id: {
                type:DataTypes.UUID,
                allowNull:false  
            },
            content_type:{
                type: DataTypes.ENUM("theoretical", "case_based", "practical", "ward_round"),
                allowNull:false,
            },
            description: {
                type:DataTypes.TEXT,
              allowNull:true,
            },
             is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },


        },  {
  tableName: "syllabus_entries",
      timestamps: true,
  }
    )

    return syllabusEntries

} 