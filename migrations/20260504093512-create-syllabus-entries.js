'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('syllabus_entries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      chapter_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'chapters', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      content_type: {
        type: Sequelize.ENUM('theoretical', 'case_based', 'practical', 'ward_round'),
        allowNull: false,
      },
      description: {
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

    await queryInterface.addIndex('syllabus_entries', ['chapter_id']);
    await queryInterface.addIndex('syllabus_entries', ['chapter_id', 'content_type']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('syllabus_entries');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_syllabus_entries_content_type";');
  },
};