const MonitorLog = require('../repositories/ReportRepository');

const ReportService = {
  async storeLog(log) {
    try {
      await MonitorLog.createLog(log);
    } catch (error) {
      console.error(error);
      // todo: log this error
    }
  },

  async getTimpstampeAndStatus(urlId) {
    try {
      const rows = await MonitorLog.selectByUrlId(urlId, ['id','timestamp', 'status']);
      return rows;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ReportService;
