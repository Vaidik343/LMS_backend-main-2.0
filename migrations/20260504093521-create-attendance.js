'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'sessions', key: 'id' },
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
      is_present: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      remark: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
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

    await queryInterface.addIndex('attendances', ['session_id']);
    await queryInterface.addIndex('attendances', ['student_id']);
    await queryInterface.addIndex('attendances', ['session_id', 'student_id'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('attendances');
  },
};