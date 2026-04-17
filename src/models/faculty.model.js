module.exports = (sequelize, DataTypes) => {
    const Faculty = sequelize.define(
        'Faculty',
        {
            id: {
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false 
            },
            employee_id: {            
            type: DataTypes.UUID,
            allowNull:false ,
             unique: true 
            },
             department_id: {            
            type: DataTypes.UUID,
            allowNull:false 
            },
            designation: {
                type:DataTypes.ENUM("teacher","hod","principal"),
                allowNull: false 
            },
            phone: {
                type: DataTypes.STRING(10),
                allowNull: false 
            },
            address: {
                type:DataTypes.TEXT,
                allowNull:false
            },
            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },

            
        },  {
            tableName: "faculties",
            timestamps: true,
        }
    )

    return Faculty

}