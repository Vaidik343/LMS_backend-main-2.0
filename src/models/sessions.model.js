// id UUID PK
// faculty_id UUID FK → faculty
// subject_id UUID FK → subjects
// batch_id UUID FK → batches
// division_id UUID FK → divisions
// semester_id UUID FK → semesters
// academic_year_id UUID FK → academic_years
// session_type ENUM lecture, practical, clinical
// session_date DATEONLY
// start_time TIME
// end_time TIME
// topics_covered TEXT
// methods_used STRING
// is_active BOOLEAN

module.exports = (sequelize, DataTypes) => {
    const Sessions = sequelize.define(
        'Sessions', 
        {
            id: {
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false, 
            },

            faculty_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },
            subject_id : {
                type:DataTypes.UUID,
                allowNull: false 
            },
            batch_id : {
                type:DataTypes.UUID,
                allowNull: false 
            },
            division_id : {
                type:DataTypes.UUID,
                allowNull: false 
            },
          
            semester_id : {
                type:DataTypes.UUID,
                allowNull: false 
            },

            academic_year_id: {
                type:DataTypes.UUID,
                allowNull: false 
            },

            session_type: {
                type: DataTypes.ENUM("lecture", "practical", "clinical"),
                allowNull: false 
            },
            session_date: {
                type: DataTypes.DATEONLY,
                allowNull: false    
            },
            start_time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            end_time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            topics_covered: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            methods_used: {
                type: DataTypes.STRING,
                allowNull: true
            },  


            is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
     },
             
        } , {
             tableName: "sessions",
            timestamps: true,
        }
    )

    return Sessions
}
