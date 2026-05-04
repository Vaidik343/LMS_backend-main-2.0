module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('academic_years', [
      {
        id: '44444444-4444-4444-4444-444444444444',
        label: '2024-2025',
        start_date: '2024-07-01',
        end_date: '2025-06-30',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('academic_years', {
      id: '44444444-4444-4444-4444-444444444444'
    }, {});
  }
};
