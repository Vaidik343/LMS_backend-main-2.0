module.exports = (sequelize, DataTypes) => {
  const Division = sequelize.define("Division", {
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     }


  }, {
  tableName: "divisions",
      timestamps: true,
  });

  return Division;
};