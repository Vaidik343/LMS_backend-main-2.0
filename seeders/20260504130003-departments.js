module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('departments', [
      {
        id: '55555555-5555-4555-8555-555555555555',
        name: 'Medical Sciences',
        code: 'MED',
        description: 'Department of Medicine and allied health sciences',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '66666666-6666-4666-8666-666666666666',
        name: 'Nursing',
        code: 'NUR',
        description: 'Department of Nursing studies and practice',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('departments', {
      id: [
        '55555555-5555-4555-8555-555555555555',
        '66666666-6666-4666-8666-666666666666'
      ]
    }, {});
  }
};
