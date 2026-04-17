module.exports = (sequelize, DataTypes) => {
    const AcademicYears = sequelize.define(
        "AcademicYears",
        {
            id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      label : {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        comment: 'e.g. 2024-2025',
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull:false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull:false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
         defaultValue: false,
        allowNull: false,
        comment: 'Only one academic year should be active at a time',
      },
        },
         {
      tableName: "academic_years",
      timestamps: true,
    }
  
        
    );

    return AcademicYears

}