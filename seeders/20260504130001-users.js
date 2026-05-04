module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '11111111-1111-4111-8111-111111111111',
        name: 'Admin User',
        email: 'admin@example.com',
        google_id: null,
        role: 'admin',
        avatar_url: null,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-2222-4222-8222-222222222222',
        name: 'Dr. Rahul Verma',
        email: 'rahul.verma@example.com',
        google_id: null,
        role: 'teacher',
        avatar_url: null,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '33333333-3333-4333-8333-333333333333',
        name: 'Samantha Rao',
        email: 'samantha.rao@example.com',
        google_id: null,
        role: 'student',
        avatar_url: null,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      id: [
        '11111111-1111-4111-8111-111111111111',
        '22222222-2222-4222-8222-222222222222',
        '33333333-3333-4333-8333-333333333333'
      ]
    }, {});
  }
};
