const Monitor = require('ping-monitor-fork');
const Notifier = require('./notifier');
const ReportService = require('../services/ReportService');

async function monitor(url) {
  const urlMonitor = new Monitor(url);

  urlMonitor.on('up', (res, state) => {
    storeLog('up', res, state);
    notify(res);
  });

  urlMonitor.on('down', (error, res, state) => {
    storeLog('down', res, state);
    notify(res);
  });

  urlMonitor.on('timeout', (error, res, state) => {
    storeLog('timeout', res, state);
    notify(res);
  });

  urlMonitor.on('error', (error, res, state) => {
    // todo: log this error
    console.error('An error occurred:', error);
  });

  urlMonitor.start();
}

async function storeLog(status, res, state) {
  const log = {
    url_id: state.metaData.urlId,
    timestamp: new Date(state.created_at).toISOString(),
    response_time: res.responseTime || null,
    status,
  };

  ReportService.storeLog(log);
}

async function notify(res) {
  if (res.shouldAlertDown) {
    await Notifier.notify(res);
  }
}

module.exports = monitor;
