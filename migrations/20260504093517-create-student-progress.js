'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students_progress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'students', key: 'id' },
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
      current: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addIndex('students_progress', ['student_id']);
    await queryInterface.addIndex('students_progress', ['batch_id']);
    await queryInterface.addIndex('students_progress', ['semester_id']);
    await queryInterface.addIndex('students_progress', ['student_id', 'current']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('students_progress');
  },
};