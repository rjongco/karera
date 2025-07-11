"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      functionality: {
        // Add associatedType column for polymorphic association
        type: Sequelize.STRING,
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(50),
      },
      associatedId: {
        // Add associatedId column for polymorphic association
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      associatedType: {
        // Add associatedType column for polymorphic association
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add indexes for associatedId and associatedType columns
    await queryInterface.addIndex("logs", ["associatedId", "associatedType"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("logs");
  },
};
