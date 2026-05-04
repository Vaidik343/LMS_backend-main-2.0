module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('faculties', [
      {
        id: '18181818-1818-4181-8181-181818181818',
        user_id: '22222222-2222-4222-8222-222222222222',
        employee_id: '19191919-1919-4191-8191-191919191919',
        department_id: '55555555-5555-4555-8555-555555555555',
        designation: 'teacher',
        phone: '9876543210',
        address: '123 Medical College Road, Mumbai',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('faculties', {
      id: '18181818-1818-4181-8181-181818181818'
    }, {});
  }
};
