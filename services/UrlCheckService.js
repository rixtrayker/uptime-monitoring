const UrlCheckRepository = require('../repositories/UrlCheckRepository');

const UrlCheckService = {
  async getUrl(id) {
    try {
      const row = await UrlCheckRepository.getUrl(id);
      return row;
    } catch (error) {
      throw error;
    }
  },

  async createUrl(data, userId) {
    try {
      data = makeSureItsArray(data)
      const urls = addUserIdsToObjects(data);
      const rows = await UrlCheckRepository.createUrl(urls);
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

      const row = await UrlCheckRepository.updateUrl(id, url);
      return row;
    } catch (error) {
      throw error;
    }
  },

  async findByTags(tags){
    try {
      const rows = await UrlCheckRepository.findByTags(tags);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  async deleteUrl(id) {
    try {
      return await UrlCheckRepository.deleteUrl(id);
    } catch (error) {
      throw error;
    }
  },
};

function addUserIdsToObjects(array, userId) {
  return array.map((obj) => {
    return { ...obj, user_id: userId };
  });
}

function makeSureItsArray(data) {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
}


module.exports = UrlCheckService;