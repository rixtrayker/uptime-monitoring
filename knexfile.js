// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = require('./config/database');

module.exports = {

  development: {
    ...config
  },

  production: {
    ...config
  }

};
