module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chapters', [
      {
        id: '15151515-1515-4151-8151-151515151515',
        subject_id: '13131313-1313-4131-8131-131313131313',
        title: 'Introduction to Anatomy',
        order_index: 1,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '16161616-1616-4161-8161-161616161616',
        subject_id: '13131313-1313-4131-8131-131313131313',
        title: 'Skeletal System',
        order_index: 2,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '17171717-1717-4171-8171-171717171717',
        subject_id: '14141414-1414-4141-8141-141414141414',
        title: 'Nursing Ethics',
        order_index: 1,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chapters', {
      id: [
        '15151515-1515-4151-8151-151515151515',
        '16161616-1616-4161-8161-161616161616',
        '17171717-1717-4171-8171-171717171717'
      ]
    }, {});
  }
};
