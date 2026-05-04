module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subjects', [
      {
        id: '13131313-1313-4131-8131-131313131313',
        semester_id: '10101010-1010-4101-8101-101010101010',
        name: 'Human Anatomy',
        code: 'ANAT-101',
        description: 'Introduction to human anatomy for first year medical students',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '14141414-1414-4141-8141-141414141414',
        semester_id: '12121212-1212-4121-8121-121212121212',
        name: 'Nursing Fundamentals',
        code: 'NUR-101',
        description: 'Basic nursing skills and foundational practice',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subjects', {
      id: [
        '13131313-1313-4131-8131-131313131313',
        '14141414-1414-4141-8141-141414141414'
      ]
    }, {});
  }
};
