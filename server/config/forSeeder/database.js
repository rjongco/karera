require("dotenv").config(); // Load dotenv
const { Sequelize } = require("sequelize");

// Initialize your Sequelize instance
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    timezone: "+08:00",
    logging: false, // Set to true to log SQL queries
  }
);

module.exports = connection;
