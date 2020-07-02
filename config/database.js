const { Client } = require('pg');

require('dotenv').config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@donator-manager-do-user-4768423-0.db.ondigitalocean.com:25060/${process.env.DB_NAME}?sslmode=require`;


const client = new Client({
    connectionString,
    ssl: true,
    rejectUnauthorized: false
  });



module.exports = client;