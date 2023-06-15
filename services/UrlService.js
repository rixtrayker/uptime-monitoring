const UrlRepository = require('../repositories/UrlRepository');

const UrlService = {
  async getUrl(id) {
    try {
      const row = await UrlRepository.getUrl(id);
      return row;
    } catch (error) {
      throw error;
    }
  },

  async getAllUrls(userId) {
    try {
      const row = await UrlRepository.getAllUrls(userId);
      return row;
    } catch (error) {
      throw error;
    }
  },

  async createUrl(data, userId) {
    try {
      data = makeSureItsArray(data)
      const urls = data.map((obj) => {return { ...obj, user_id: userId };});

      const rows = await UrlRepository.createUrl(urls);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async updateUrl(id, url) {
    try {

      // For extra security to prevent overwriting 
      // otherwise it isn't allowed to send parameter user_id 
      // so our validation package has no critiacl CVE until now 

      delete url.user_id;

      const row = await UrlRepository.updateUrl(id, url);
      return row;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags){
    try {
      const rows = await UrlRepository.findByTags(tags);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  async deleteUrl(id) {
    try {
      return await UrlRepository.deleteUrl(id);
    } catch (error) {
      throw error;
    }
  },
};

function makeSureItsArray(data) {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
}


module.exports = UrlService;