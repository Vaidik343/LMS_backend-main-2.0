module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define(
        'Subjects', {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull:false,
            },
            semester_id: {
                type:DataTypes.UUID,
                allowNull:false, 
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
             tableName: "subjects",
             timestamps: true,
        }

    )

    return Subjects

}