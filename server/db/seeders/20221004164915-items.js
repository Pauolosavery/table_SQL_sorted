module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [{
      date: '2022-10-04 07:40:59.583+03',
      title: 'Пешая пробежка',
      amount: 15,
      distance: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      date: '2022-10-04 07:40:59.583+03',
      title: 'Велопрогулка',
      amount: 7,
      distance: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
