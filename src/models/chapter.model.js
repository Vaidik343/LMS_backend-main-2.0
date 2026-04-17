module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define(
        'Chapter',
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            subject_id: {
                type:DataTypes.UUID,
                allowNull: false
            },
            title: {
                type:DataTypes.STRING,
                allowNull: false,
               
            },
            order_index: {
                type: DataTypes.INTEGER, // for ordering chapter within a subject
                allowNull:false 
            },
           is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     }


        }, {
            tableName:'chapters',
            timestamps: true
        }
    )

    return Chapter

}