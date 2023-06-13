const UrlCheckRepository = require('../repositories/UrlCheckRepository');
const knex = require('../utils/db');

const UrlCheckService = {
    async deleteUrl(id) {
        try {
          await UserRepository.deleteUser(id);
        } catch (error) {
          throw error;
        }
      },
};

module.exports = UrlCheckService;