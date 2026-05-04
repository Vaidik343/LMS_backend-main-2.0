module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('classes', [
      {
        id: '77777777-7777-4777-8777-777777777777',
        name: 'MBBS',
        code: 'MBBS',
        duration_years: 5,
        description: 'Bachelor of Medicine and Bachelor of Surgery',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '88888888-8888-4888-8888-888888888888',
        name: 'Nursing',
        code: 'NUR',
        duration_years: 4,
        description: 'Bachelor of Science in Nursing',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('classes', {
      id: [
        '77777777-7777-4777-8777-777777777777',
        '88888888-8888-4888-8888-888888888888'
      ]
    }, {});
  }
};
