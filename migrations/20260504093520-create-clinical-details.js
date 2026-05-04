'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clinical_details', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'sessions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clinical_type: {
        type: Sequelize.ENUM('ward_round', 'opd', 'case_study'),
        allowNull: false,
      },
      case_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      patient_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ward_name: {
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

    await queryInterface.addIndex('clinical_details', ['session_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clinical_details');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_clinical_details_clinical_type";');
  },
};