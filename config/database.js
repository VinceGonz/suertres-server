
require('dotenv').config();

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
  
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  rejectUnauthorized: false,
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  dialectOptions: {
    ssl: true
  }
});


module.exports = db;