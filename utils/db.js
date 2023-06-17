const knex = require('knex');
const knexConfig = require('../knexfile');
require('dotenv').config();

const appEnv = process.env.APP_ENV || 'development';

let db;

try {
  db = knex(knexConfig[appEnv]);
} catch (error) {
  console.error('Error connecting to the database:', error);
  throw new Error('Error connecting to the database');
}

module.exports = db;
