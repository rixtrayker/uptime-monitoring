const ReportService = require('../services/ReportService');

const reportUtils = {
  async generateReport(urlState) {
    const status = ['DOWN', 'UP'][urlState.isUp & 1];
    const availability = ((urlState.totalDownTimes / urlState.totalRequests) * 100).toFixed(2);
    const outages = urlState.totalDownTimes;
    const downtime = urlState.totalDownTimes * urlState.interval * 60;
    const uptime = urlState.totalRequests * urlState.interval * 60;
    const responseTime = urlState.averageResponseTime.toFixed(2);

    const urlId = urlState.metaData.urlId;
    const history = await ReportService.getTimpstampeAndStatus(urlId);

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

  availabilityPercent(outages, uptime) {
    return uptime / (uptime + outages);
  },
};

module.exports = reportUtils;
