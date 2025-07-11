'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [users, metadata] = await queryInterface.sequelize.query("SELECT * FROM users");

    let wallets = [];
    users.forEach(user => {
      wallets.push({ user_id: user.id, balance: 1000});
    })

    await queryInterface.bulkInsert('wallets', wallets, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wallets', wallets, {});
  }
};