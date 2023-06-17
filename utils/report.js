const ReportService = require('../services/ReportService');

const reportUtils = {
  async generateReport(urlState) {
    let totalUpTimes = urlState.totalRequests - urlState.totalDownTimes;

    let status = ['DOWN', 'UP'][urlState.isUp & 1];
    let availability = ((totalUpTimes / urlState.totalRequests) * 100).toFixed(2);
    let outages = urlState.totalDownTimes;
    let downtime = urlState.totalDownTimes * urlState.interval * 60;
    let uptime = (totalUpTimes * urlState.interval).toFixed(2);
    let responseTime = urlState.avgResponseTime.toFixed(2);
    let urlId = urlState.metaData.urlId;
    let history = await ReportService.getTimpstampeAndStatus(urlId);

    history = history.map(entry => ({
      timestamp: new Date(entry.timestamp).toLocaleString(),
      status: entry.status.toUpperCase(),
    }));

    return {
      status,
      availability,
      outages,
      downtime,
      uptime,
      responseTime,
      history,
    };
  },
};

module.exports = reportUtils;
