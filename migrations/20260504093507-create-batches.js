'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('batches', {
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
      academic_year_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'academic_years', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      name: {
        type: Sequelize.STRING,
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

    await queryInterface.addIndex('batches', ['course_id']);
    await queryInterface.addIndex('batches', ['academic_year_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('batches');
  },
};