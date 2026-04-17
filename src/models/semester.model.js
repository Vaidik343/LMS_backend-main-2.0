module.exports = (sequelize, DataTypes) => {
    const Semester = sequelize.define(
        'Semester',{
            id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

       batch_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

     course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull:false 
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     }


        },
         {
      tableName: "semesters",
      timestamps: true,
    }
    )

    return Semester

}
