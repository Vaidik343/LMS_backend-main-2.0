'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faculties', {
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
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'departments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      employee_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      designation: {
        type: Sequelize.ENUM('teacher', 'hod', 'principal'),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(10),
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

    await queryInterface.addIndex('faculties', ['user_id']);
    await queryInterface.addIndex('faculties', ['department_id']);
    await queryInterface.addIndex('faculties', ['employee_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('faculties');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_faculties_designation";');
  },
};