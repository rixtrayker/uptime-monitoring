const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/authUtil');
const UserRepository = require('../repositories/UserRepository');

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
};

module.exports = AuthService;