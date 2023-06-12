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

  async createUser(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserRepository.createUser(name, email, hashedPassword);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async verifyEmail(token) {
    try {
      const user = await knex('users').where({ email_verification_token:token }).first();
      if(!user) 
        return false;

      await knex('users').where({ email_verification_token:token }).update({ verified_at: new Date(), email_verification_token: null });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;