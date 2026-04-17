module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        'department',
        {

            id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
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
      tableName: "departments",
      timestamps: true,
    }
    ) ;

    return Department
    
}