'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chapters', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      subject_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'subjects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_index: {
        type: Sequelize.INTEGER,
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

    await queryInterface.addIndex('chapters', ['subject_id']);
    await queryInterface.addIndex('chapters', ['subject_id', 'order_index']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('chapters');
  },
};