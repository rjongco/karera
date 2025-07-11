"use strict";

const City = require("../models/forSeederModel/City");
const { BARANGAY_DATA } = require("../constants/forSeeder/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Disable foreign key checks
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await queryInterface.bulkDelete("barangays", null, {});

    // Enable foreign key checks
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    const cities = await City.findAll({ attributes: ["id", "name"] });
    let barangaysRecord = [];
    // console.log(cities);
    for (const city of cities) {
      const cityName = city.name;
      const barangays = BARANGAY_DATA[cityName] || [];

      const cityId = city.id;

      const barangayObjects = barangays.map((barangayName) => ({
        name: barangayName,
        cityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      barangaysRecord = barangaysRecord.concat(barangayObjects);
    }

    try {
      if (!Array.isArray(barangaysRecord)) {
        throw new Error("City records must be an array.");
      }

      return queryInterface.bulkInsert("barangays", barangaysRecord);
    } catch (error) {
      console.error("Error in seedCities migration:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("barangays", null, {});
  },
};
