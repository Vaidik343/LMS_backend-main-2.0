module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('semesters', [
      {
        id: '10101010-1010-4101-8101-101010101010',
        batch_id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        course_id: '99999999-9999-4999-8999-999999999999',
        number: 1,
        label: 'Semester 1',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '12121212-1212-4121-8121-121212121212',
        batch_id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        course_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        number: 1,
        label: 'Semester 1',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('semesters', {
      id: [
        '10101010-1010-4101-8101-101010101010',
        '12121212-1212-4121-8121-121212121212'
      ]
    }, {});
  }
};
