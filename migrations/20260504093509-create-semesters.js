'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('semesters', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      label: {
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

    await queryInterface.addIndex('semesters', ['course_id']);
    await queryInterface.addIndex('semesters', ['batch_id']);
    await queryInterface.addIndex('semesters', ['course_id', 'batch_id', 'number'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('semesters');
  },
};