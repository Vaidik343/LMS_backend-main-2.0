// id UUID PK
// session_id UUID FK → sessions
// chapter_id UUID FK → chapters
// is_active BOOLEAN

module.exports = (sequelize, DataTypes) => {
    const SessionChapters = sequelize.define(
        'SessionChapters', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        session_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        is_active: {

            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        tableName: "session_chapters",
        timestamps: true,
    }
)

return SessionChapters

}


