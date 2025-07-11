import dotenv from "dotenv";
dotenv.config();

interface DatabaseConfig {
  dialect: string;
  host: string;
  username: string;
  password: string;
  database: string;
  timezone: string;
  migrationStorageTableName: string;
  port: number;
  stasher_url: string;
  stasher_token: string;
  stasher_secret: string;
  base_url: string;
  frontend_url: string;
}

const config: { [key: string]: DatabaseConfig } = {
  local: {
    dialect: "mysql",
    host: process.env.DB_HOST || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    timezone: process.env.DB_TIMEZONE || "+08:00",
    migrationStorageTableName: "migrations",
    port: 3306,
    stasher_url: process.env.STASHER_DEV_URL || "",
    stasher_token: process.env.STASHER_DEV_TOKEN || "",
    stasher_secret: process.env.STASHER_DEV_SECRET || "",
    base_url: process.env.LOCAL_BASE_URL || "",
    frontend_url: process.env.LOCAL_FRONTEND_URL || "",
    // Other configurations for development...
  },
  development: {
    dialect: "mysql",
    host: process.env.DB_HOST || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    timezone: process.env.DB_TIMEZONE || "+08:00",
    migrationStorageTableName: "migrations",
    port: 3306,
    stasher_url: process.env.STASHER_DEV_URL || "",
    stasher_token: process.env.STASHER_DEV_TOKEN || "",
    stasher_secret: process.env.STASHER_DEV_SECRET || "",
    base_url: process.env.DEV_BASE_URL || "",
    frontend_url: process.env.DEV_FRONTEND_URL || "",
    // Other configurations for development...
  },
  production: {
    dialect: "mysql",
    host: process.env.DB_HOST || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    timezone: process.env.DB_TIMEZONE || "+08:00",
    migrationStorageTableName: "migrations",
    port: 3306,
    stasher_url: process.env.STASHER_DEV_URL || "",
    stasher_token: process.env.STASHER_DEV_TOKEN || "",
    stasher_secret: process.env.STASHER_DEV_SECRET || "",
    base_url: process.env.PROD_BASE_URL || "",
    frontend_url: process.env.PROD_FRONTEND_URL || "",
    // Other configurations for production...
  },
};

export default config;
