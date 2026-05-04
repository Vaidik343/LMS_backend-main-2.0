module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('divisions', [
      {
        id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        batch_id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        name: 'Division A',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
        batch_id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        name: 'Division B',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('divisions', {
      id: [
        'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'
      ]
    }, {});
  }
};
