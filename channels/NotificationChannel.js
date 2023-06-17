const Channel = require('./Channel');
const mail = require('../utils/mail');
const pushOver = require('../utils/pushover');
const { generateReport } = require('../utils/report');
const { logger } = require('handlebars');

class NotificationChannel extends Channel {
  constructor() {
    super();
    this.mailer = new mail();
  }

  name = 'main-channel';

  async restored(res, state) {
    this.sendNotification(state);
  }

  async down(res, state) {
    if (state.shouldAlertDown) {
      this.sendNotification(state);
    }
  }

  async timeout(error, res, state) {
    if (state.shouldAlertDown) {
      this.sendNotification(state);
    }
  }

  up(res, state) {}

  stop(res, state) {}

  error(error, res) {}

  async sendNotification(state) {
    const report = await generateReport(state);

    try {
      await this.mailer.sendMail(state.metaData.email, report);
    } catch (err) {
      logger.error(error);
    }
    // pushOver.sendPushOver(state.metaData.pushover, report);
  }
}

module.exports = NotificationChannel;
