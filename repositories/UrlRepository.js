const knex = require('../utils/db');
const UrlModel = require('../models/url');

const UrlRepository = {
  async getUrl(id) {
    try {
      const row = await UrlModel.query().where({ id }).first();
      return row;
    } catch (error) {
      throw error;
    }
  },

  async getAllUrls(userId) {
    try {
      const row = await UrlModel.query().where({ user_id: userId }).select('*');
      return row;
    } catch (error) {
      throw error;
    }
  },

  async createUrl(urls) {
    try {
      const rows = await UrlModel.query().insert(urls).returning('*');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async updateUrl(id, url) {
    try {
      const row = await UrlModel.query().where({ id }).update(url).returning('*');
      return row;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags) {
    try {
      const rows = await UrlModel.query()
        .whereRaw(`tags && '{${JSON.stringify(tags).slice(1, -1)}}'`)
        .select('*');
      return rows;
    } catch (error) {
      throw new Error('Database error');
    }
  },

  async deleteUrl(id) {
    try {
      return await UrlModel.query().where({ id }).del();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UrlRepository;
