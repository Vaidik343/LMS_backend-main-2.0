module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('batches', [
      {
        id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        course_id: '99999999-9999-4999-8999-999999999999',
        academic_year_id: '44444444-4444-4444-4444-444444444444',
        name: 'MBBS Batch 2024',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        course_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        academic_year_id: '44444444-4444-4444-4444-444444444444',
        name: 'Nursing Batch 2024',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('batches', {
      id: [
        'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        'cccccccc-cccc-4ccc-8ccc-cccccccccccc'
      ]
    }, {});
  }
};
