module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define(
        'Courses',
        {
            id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      department_id : {
        type: DataTypes.UUID,
        allowNull: false
      },
      class_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
         allowNull:false
        }

        }, 
        {
             tableName: "courses",
             timestamps: true,
        }
    );

    return Courses

}