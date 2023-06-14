const { Model } = require('objection');
const db = require('../utils/db');

Model.knex(db);

class Url extends Model {
  static get tableName() {
    return 'urls';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'url', 'protocol'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        url: { type: 'string' },
        protocol: { type: 'string', enum: ['HTTP', 'HTTPS', 'TCP'] },
        path: { type: 'string', nullable: true },
        port: { type: 'integer', nullable: true },
        webhook: { type: 'string', nullable: true },
        timeout: { type: 'integer', nullable: true, default: 5 },
        interval: { type: 'integer', nullable: true, default: 10 },
        threshold: { type: 'integer', nullable: true, default: 1 },
        authentication: { type: 'object', nullable: true },
        http_headers: { type: 'object', nullable: true },
        assert: { type: 'object', nullable: true },
        tags: { type: 'array', items: { type: 'string' }, nullable: true },
        ignore_ssl: { type: 'boolean', nullable: true, default: false },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
      },
    };
  }
}

module.exports = Url;
