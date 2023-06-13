const knex = require('../utils/db');
const UrlCheck = require('../models/UrlCheck');

const UrlCheckRepository = {

  async createUrl(urlObject) {
    try {
      await knex('url_checks').insert(urlObject);
      const url = await database('users').where(urlObject).first();
      return url;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags) {
    try {
      const rows= await knex('url_checks').whereRaw(`tags @> '{${JSON.stringify(tags).slice(1, -1)}}'`).select('*');
      return rows;
    } catch (error) {
      throw new Error('Database error');
    }
  },
};

module.exports = UrlCheckRepository;