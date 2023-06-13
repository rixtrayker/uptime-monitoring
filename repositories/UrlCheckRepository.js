const knex = require('../utils/db');
const UrlCheck = require('../models/UrlCheck');

const UrlCheckRepository = {
  async createUrl(urls) {
    try {
      if (!Array.isArray(urls)) {
        urls = [urls]; // Convert a single URL to an array
      }

      await knex('url_checks').insert(urls);
      const rows = await knex('url_checks').whereIn('url', extractUrls(urls)).select('*');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags) {
    try {
      const rows = await knex('url_checks').whereRaw(`tags @> '{${JSON.stringify(tags).slice(1, -1)}}'`).select('*');
      return rows;
    } catch (error) {
      throw new Error('Database error');
    }
  },
};

function extractUrls(x) {
  if (Array.isArray(x)) {
    return x.map(obj => obj.url);
  } else if (typeof x === 'object' && x !== null) {
    return [x.url];
  } else {
    return [];
  }
}

module.exports = UrlCheckRepository;