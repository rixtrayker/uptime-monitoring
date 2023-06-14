const config = require('./config/database');

module.exports = {

  development: {
    ...config
  },

  production: {
    ...config
  }

};
