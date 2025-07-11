"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { generatingRecords } = require("../utils/seederLogic");
    return queryInterface.bulkInsert("users", generatingRecords());
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
