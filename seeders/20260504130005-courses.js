module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', [
      {
        id: '99999999-9999-4999-8999-999999999999',
        department_id: '55555555-5555-4555-8555-555555555555',
        class_id: '77777777-7777-4777-8777-777777777777',
        name: 'MBBS Course',
        code: 'MBBS-001',
        description: 'Complete medical undergraduate course',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        department_id: '66666666-6666-4666-8666-666666666666',
        class_id: '88888888-8888-4888-8888-888888888888',
        name: 'Nursing Course',
        code: 'NUR-001',
        description: 'Complete nursing undergraduate course',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', {
      id: [
        '99999999-9999-4999-8999-999999999999',
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
      ]
    }, {});
  }
};
