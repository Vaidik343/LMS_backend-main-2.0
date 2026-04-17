module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define(
        'RefreshToken', {
            id: {
                type:DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false 
            },

            user_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            
            token: {
                type:DataTypes.TEXT,
                allowNull: false
            },

            expirers_at : {
                type: DataTypes.UUID,
                
            }, 
            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },

        } ,  {
            tableName: "refresh_tokens",
            timestamps: true,
        }
    )

    return RefreshToken
}