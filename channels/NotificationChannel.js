const Channel = require('./Channel');
const mail = require('../utils/mail');
const pushoverSend = require('../utils/pushover');
const { generateReport } = require('../utils/report');
const { logger } = require('handlebars');
const Url = require('../models/Url');
class NotificationChannel extends Channel {
  constructor() {
    super();
    this.mailer = new mail();
  }

  name = 'main-channel';

  async restored(res, state) {
    this.sendNotification(state);
    webhookNotify(state);
  }

  async down(res, state) {
    if (state.shouldAlertDown) {
      this.sendNotification(state);
      webhookNotify(state);
    }
  }

  async timeout(error, res, state) {
    if (state.shouldAlertDown) {
      this.sendNotification(state);
      webhookNotify(state);
    }
  }

  up(res, state) {}

  stop(res, state) {}

  error(error, res) {}

  async webhookNotify(state) {
    const url = await Url.query().where({ id: state.metaData.id }).first();
    const status = ['DOWN', 'UP'][state.isUp & 1];

    hook = `${url.webhook}?status=${status}&url_id=${state.metaData.id}`;

    fetch(hook).catch((err) => {console.log(err)});
  }

  async sendNotification(state) {
    const report = await generateReport(state);

    try {
      await this.mailer.sendMail(state.metaData.email, report);
    } catch (err) {
      logger.error(error);
    }
    pushoverSend(report);
  }
}

module.exports = NotificationChannel;
