"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Disable foreign key checks
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await queryInterface.bulkDelete("provinces", null, {});

    // Enable foreign key checks
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    const provincesData = [
      { name: "ABRA" },
      { name: "AGUSAN DEL NORTE" },
      { name: "AGUSAN DEL SUR" },
      { name: "AKLAN" },
      { name: "ALBAY" },
      { name: "ANTIQUE" },
      { name: "APAYAO" },
      { name: "AURORA" },
      { name: "BASILAN" },
      { name: "BATAAN" },
      { name: "BATANES" },
      { name: "BATANGAS" },
      { name: "BENGUET" },
      { name: "BILIRAN" },
      { name: "BOHOL" },
      { name: "BUKIDNON" },
      { name: "BULACAN" },
      { name: "CAGAYAN" },
      { name: "CAMARINES NORTE" },
      { name: "CAMARINES SUR" },
      { name: "CAMIGUIN" },
      { name: "CAPIZ" },
      { name: "CATANDUANES" },
      { name: "CAVITE" },
      { name: "CEBU" },
      { name: "COTABATO" },
      { name: "DAVAO DE ORO" },
      { name: "DAVAO DEL NORTE" },
      { name: "DAVAO DEL SUR" },
      { name: "DAVAO OCCIDENTAL" },
      { name: "DAVAO ORIENTAL" },
      { name: "DINAGAT ISLANDS" },
      { name: "EASTERN SAMAR" },
      { name: "GUIMARAS" },
      { name: "IFUGAO" },
      { name: "ILOCOS NORTE" },
      { name: "ILOCOS SUR" },
      { name: "ILOILO" },
      { name: "ISABELA" },
      { name: "KALINGA" },
      { name: "LA UNION" },
      { name: "LAGUNA" },
      { name: "LANAO DEL NORTE" },
      { name: "LANAO DEL SUR" },
      { name: "LEYTE" },
      { name: "MAGUINDANAO" },
      { name: "MARINDUQUE" },
      { name: "MASBATE" },
      { name: "METRO MANILA" },
      { name: "MISAMIS OCCIDENTAL" },
      { name: "MISAMIS ORIENTAL" },
      { name: "MOUNTAIN PROVINCE" },
      { name: "NEGROS OCCIDENTAL" },
      { name: "NEGROS ORIENTAL" },
      { name: "NORTHERN SAMAR" },
      { name: "NUEVA ECIJA" },
      { name: "NUEVA VIZCAYA" },
      { name: "OCCIDENTAL MINDORO" },
      { name: "ORIENTAL MINDORO" },
      { name: "PALAWAN" },
      { name: "PAMPANGA" },
      { name: "PANGASINAN" },
      { name: "QUEZON" },
      { name: "QUIRINO" },
      { name: "RIZAL" },
      { name: "ROMBLON" },
      { name: "SAMAR" },
      { name: "SARANGANI" },
      { name: "SIQUIJOR" },
      { name: "SORSOGEN" },
      { name: "SOUTH COTABATO" },
      { name: "SOUTHERN LEYTE" },
      { name: "SULTAN KUDARAT" },
      { name: "SULU" },
      { name: "SURIGAO DEL NORTE" },
      { name: "SURIGAO DEL SUR" },
      { name: "TARLAC" },
      { name: "TAWI-TAWI" },
      { name: "ZAMBALES" },
      { name: "ZAMBOANGA DEL NORTE" },
      { name: "ZAMBOANGA DEL SUR" },
      { name: "ZAMBOANGA SIBUGAY" },
  ];
    await queryInterface.bulkInsert("provinces", provincesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("provinces", null, {});
  },
};
