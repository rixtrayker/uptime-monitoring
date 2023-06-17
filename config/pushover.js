require('dotenv').config();

const auth = {
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN,
};

module.exports = auth;
