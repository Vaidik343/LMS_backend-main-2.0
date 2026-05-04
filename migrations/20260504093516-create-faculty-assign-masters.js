'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faculty_assign_master', {
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
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'departments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
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
      subject_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'subjects', key: 'id' },
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

    await queryInterface.addIndex('faculty_assign_master', ['faculty_id']);
    await queryInterface.addIndex('faculty_assign_master', ['department_id']);
    await queryInterface.addIndex('faculty_assign_master', ['subject_id']);
    await queryInterface.addIndex('faculty_assign_master', ['batch_id']);
    await queryInterface.addIndex('faculty_assign_master', ['academic_year_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('faculty_assign_master');
  },
};