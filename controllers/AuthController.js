const Joi = require('joi');
const AuthService = require('../services/AuthService');
const { StatusCodes } = require('http-status-codes');
const { validateLogin, validateSignup } = require('../validate/AuthValidator');

const AuthController = {
  async signup(req, res) {
    try {
      const { error } = validateSignup(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: validationError.details[0].message });
        return;
      }

      const user = await AuthService.signup(req.body);
      res.status(StatusCodes.CREATED).json({ message: 'Signup successful', user });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  },

  async login(req, res) {
    try {
      const { error } = validateLogin(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: validationError.details[0].message });
        return;
      }

      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
     
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error});
    }
  },
};

module.exports = AuthController;