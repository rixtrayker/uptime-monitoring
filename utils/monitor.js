const Monitor = require('ping-monitor-fork');
const NotificationChannel = require('../channels/NotificationChannel');
// const SlackChannel = require('../channels/NotificationChannel'); 
const ReportService = require('../services/ReportService');

async function monitor(url) {
  const urlMonitor = new Monitor(url);

  // Notification channels
  urlMonitor.addChannel(new NotificationChannel());

  urlMonitor.on('up', (res, state) => {
    storeLog('up', res, state);
  });

  urlMonitor.on('restored', (res, state) => {
    storeLog('up', res, state);
  });

  urlMonitor.on('down', (error, res, state) => {
    storeLog('down', res, state);
  });

  urlMonitor.on('timeout', (error, res, state) => {
    storeLog('timeout', res, state);
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

module.exports = monitor;
