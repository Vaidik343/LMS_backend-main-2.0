module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: "e.g. MBBS, nursing, BDS",
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment:'e.g MBBS, BDS'
    },

    duration_years: {
        type: DataTypes.INTEGER,
          allowNull: false,
        comment: 'Total duration of the class program in years',
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
      tableName: "classes",
      timestamps: true,
    }

);

return Class
};