const knex = require('../utils/db');
const UrlCheck = require('../models/UrlCheck');

const UrlCheckRepository = {
  async getUrl(id){
    try {
      const row = await knex('url_checks').where({ id }).first();
      return row;
    } catch (error) {
      throw error;
    }
  },

  async createUrl(urls) {
    try {
      const row = await knex('url_checks').insert(urls).returning('*');
      return row;
    } catch (error) {
      throw error;
    }
  },

  async updateUrl(id, url) {
    try {
      const row = await knex('url_checks').where({id}).update(url).returning('*');
      return row;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags) {
    try {
      const rows = await knex('url_checks').whereRaw(`tags && '{${JSON.stringify(tags).slice(1, -1)}}'`).select('*');
      return rows;
    } catch (error) {
      throw new Error('Database error');
    }
  },

  async deleteUrl(id){
    try {
      return await knex('url_checks').where({ id }).del();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UrlCheckRepository;