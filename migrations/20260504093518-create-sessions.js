'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
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
      session_type: {
        type: Sequelize.ENUM('lecture', 'practical', 'clinical'),
        allowNull: false,
      },
      session_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      topics_covered: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      methods_used: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.addIndex('sessions', ['faculty_id']);
    await queryInterface.addIndex('sessions', ['subject_id']);
    await queryInterface.addIndex('sessions', ['batch_id']);
    await queryInterface.addIndex('sessions', ['division_id']);
    await queryInterface.addIndex('sessions', ['session_date']);
    await queryInterface.addIndex('sessions', ['faculty_id', 'session_date']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sessions');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_sessions_session_type";');
  },
};