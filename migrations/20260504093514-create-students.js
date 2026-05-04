'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      enrollment_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
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

    await queryInterface.addIndex('students', ['user_id']);
    await queryInterface.addIndex('students', ['enrollment_no']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('students');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_students_gender";');
  },
};