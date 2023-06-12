require('dotenv').config();

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE_NAME || 'express_app'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = config;
