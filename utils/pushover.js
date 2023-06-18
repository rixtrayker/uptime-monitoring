const config = require('../config/pushover');
const pushover = new require('pushover-notifications')(config);

function send(message) {
  try{
    pushover.send(message, (error, result) => {
        if (error) console.log(error);
      });
  } catch (err) {
    console.log(error);
  }
}

module.exports = send;
