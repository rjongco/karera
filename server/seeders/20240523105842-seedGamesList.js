"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await queryInterface.bulkDelete("games-list", null, {});

    // Enable foreign key checks
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    const gamesData = [
      {
        name: "zodiac",
        label: "Zodiac",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "laglag",
        label: "Lag Lag",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "letra-karera",
        label: "Letra Karera",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("games-list", gamesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("games-list", null, {});
  },
};
