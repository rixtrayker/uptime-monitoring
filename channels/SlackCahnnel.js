const notify = require("../utils/slack-notifier");
const Channel = require("./Channel");
 if (state.shouldAlertDown) {
class SlackChannel extends Channel {
  constructor(options) {
    this.options = {
      messages: {
        up: `Up and Running! 👍`,
        restored: `Up again and Running! 🔥🚀`,
        down: `Downtime Incidence 🛑`,
        stopped: `Monitoring Stopped ❌`,
        error: `Error/Downtime Incidence 🛑`,
        timeout: `Connection Timed Out ⏰`,
      },
      ...options,
    };
  }

  name = "slacker";

  async up(res, state) {
   
  }

  async down(res, state) {
    if (state.shouldAlertDown) {   
        notify({
        ...this.options,
        website: res.website,
        status_code: res.statusCode,
        message: this.options.messages.down,
        });
    }
  }

  async stop(res, state) {

  }

  async error(error, res) {
   
  }

  async timeout(error, res, state) {
    if (state.shouldAlertDown) {   
        notify({
        ...this.options,
        website: res.website,
        status_code: res.statusCode,
        message: this.options.messages.timeout,
        });
    }
  }
}

module.exports = SlackChannel;