'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session_chapters', {
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
      chapter_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'chapters', key: 'id' },
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

    await queryInterface.addIndex('session_chapters', ['session_id']);
    await queryInterface.addIndex('session_chapters', ['chapter_id']);
    await queryInterface.addIndex('session_chapters', ['session_id', 'chapter_id'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('session_chapters');
  },
};