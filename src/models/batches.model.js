module.exports = (sequelize, DataTypes) => {
    const Batches = sequelize.define(
        'Batches',
        {
            id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      course_id: {
        type: DataTypes.UUID,
        allowNull: false 
      },
     academic_year_id: {
        type: DataTypes.UUID,
        allowNull: false
     },
     name: {
        type: DataTypes.STRING,
        allowNull: false
     },

     is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     }

        },
        {
             tableName: "batches",
      timestamps: true,
        }
    )

    return Batches
}