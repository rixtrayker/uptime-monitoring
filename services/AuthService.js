const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/authUtil');
const UserRepository = require('../repositories/UserRepository');
const knex = require('../utils/db');

const AuthService = {
  async register({name, email, password}) {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with the provided email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.createUser({name, email, password:hashedPassword});
    return user;
  },

  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.verified_at) {
      throw new Error('Please verify your email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Please verify your email');
    }

    const token = generateToken(user);
    return {token};
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
};

module.exports = AuthService;