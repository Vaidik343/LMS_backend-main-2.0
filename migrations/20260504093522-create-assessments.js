'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      faculty_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'faculties', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      subject_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'subjects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      batch_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'batches', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      division_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'divisions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      semester_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'semesters', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      academic_year_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'academic_years', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assessment_type: {
        type: Sequelize.ENUM('quiz', 'unit_test', 'practical', 'viva', 'assignment'),
        allowNull: false,
      },
      total_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assessment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('assessments', ['faculty_id']);
    await queryInterface.addIndex('assessments', ['subject_id']);
    await queryInterface.addIndex('assessments', ['batch_id']);
    await queryInterface.addIndex('assessments', ['semester_id']);
    await queryInterface.addIndex('assessments', ['academic_year_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('assessments');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_assessments_assessment_type";');
  },
};