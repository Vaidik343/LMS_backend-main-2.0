module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('students', [
      {
        id: '20202020-2020-4202-8202-202020202020',
        user_id: '33333333-3333-4333-8333-333333333333',
        enrollment_no: 'ENR2024001',
        dob: '2006-03-12',
        gender: 'female',
        phone: '9123456780',
        address: '45 College Street, Mumbai',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', {
      id: '20202020-2020-4202-8202-202020202020'
    }, {});
  }
};
