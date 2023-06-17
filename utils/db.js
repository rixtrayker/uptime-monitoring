const knex = require('knex');
const knexConfig = require('../knexfile');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

let db;

try {
  db = knex(knexConfig[env]);
} catch (error) {
  console.error('Error connecting to the database:', error);
  throw new Error('Error connecting to the database');
}

module.exports = db;
