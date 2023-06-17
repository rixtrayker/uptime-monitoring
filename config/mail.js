require('dotenv').config();

const mailConfig = {
  sender: process.env.EMAIL_SENDER,
  service: process.env.EMAIL_SERVICE,
  user: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,
};

module.exports = mailConfig;
