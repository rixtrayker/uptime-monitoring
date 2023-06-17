const knex = require('../utils/db');
const MonitorLog = require('../models/monitor-log');

const ReportRepository = {
  async createLog(log) {
    try {
      const row = await MonitorLog.query().insert(log).returning('*');
      return row;
    } catch (error) {
      throw error;
    }
  },

  async selectByUrlId(urlId, selectQuery) {
    try {
      const rows = await MonitorLog.query().where({ url_id: urlId }).select(selectQuery);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ReportRepository;
