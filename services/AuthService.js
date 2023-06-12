const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const UserRepository = require('../repositories/UserRepository');
const JWTConfig = require('../config/jwt');

const AuthService = {
  async signup({name, email, password}) {
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

    const token = jwt.sign({ email: user.email }, JWTConfig.secret, { expiresIn: '1h' });
    return {token};
  },
};

module.exports = AuthService;