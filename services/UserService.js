const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const knex = require('../utils/db');

const UserService = {
  async getUser(id) {
    try {
      const user = await UserRepository.getUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id, {name, email, password}) {
    try {
      let hashedPassword;
      if(password)
        hashedPassword = await bcrypt.hash(password, 10);

      await UserRepository.updateUser(id, {name, email, password:hashedPassword});
      const user = await UserRepository.getUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async validEmail(id, email){
    const user = UserRepository.getUserByEmail(email);
    return user.id === id;
  },
}

module.exports = UserService;