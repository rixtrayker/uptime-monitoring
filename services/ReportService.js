const MonitorLog = require('../repositories/ReportRepository');

const ReportService = {
  async storeLog(log) {
    try {
      MonitorLog.createLog(log);
      console.error(log);
    } catch (error) {
      console.error(error);
      // todo: log this error
    }
  },

  async getTimpstampeAndStatus(urlId) {
    try {
      const rows = await MonitorLog.selectByUrlId(urlId, ['timestamp', 'status']);
      return rows;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ReportService;
