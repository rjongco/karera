require("dotenv").config(); // Load dotenv

import { Sequelize } from "sequelize";

// Define the type for the dialect
type ValidDialect = "mysql" | "postgres" | "sqlite" | "mssql";

// Initialize your Sequelize instance
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: `${process.env.DB_DIALECT}` as ValidDialect,
    host: process.env.DB_HOST,
    timezone: "+08:00",
    logging: false,
  }
);

export default connection;
