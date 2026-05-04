'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessment_results', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      assessment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'assessments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      obtained_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      remark: {
        type: Sequelize.TEXT,
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

    await queryInterface.addIndex('assessment_results', ['assessment_id']);
    await queryInterface.addIndex('assessment_results', ['student_id']);
    await queryInterface.addIndex('assessment_results', ['assessment_id', 'student_id'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('assessment_results');
  },
};