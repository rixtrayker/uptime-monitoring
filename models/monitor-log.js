const { Model } = require('objection');
const db = require('../utils/db');

Model.knex(db);

class MonitorLog extends Model {
  static get tableName() {
    return 'url_monitor_logs';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['url_id', 'status', 'timestamp'],
      properties: {
        id: { type: 'integer' },
        url_id: { type: 'integer' },
        status: { type: 'string', enum: ['up', 'down', 'timeout'] },
        response_time: { type: 'integer' },
        timestamp: { type: 'string' },
      },
    };
  }
}

module.exports = MonitorLog;
