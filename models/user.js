const { Model } = require('objection');
const db = require('../utils/db')

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;