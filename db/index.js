require('dotenv').config();

const pg = require('pg');

console.log(process.env.DATABASE_URL);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = pool;
