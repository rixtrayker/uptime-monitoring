const Joi = require('joi');
const AuthService = require('../services/AuthService');
const { StatusCodes } = require('http-status-codes');
const { validateLogin, validateRegister } = require('../validate/AuthValidator');

const AuthController = {
  async register(req, res) {
    try {
      const {name,email,password} = req.body;
      console.log(email);
      const { error } = validateRegister({name,email,password});
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const user = await AuthService.register({name,email,password});
      res.status(StatusCodes.CREATED).json({ message: 'Registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  },

  async login(req, res) {
    try {
      const {email,password} = req.body;
      const { error } = validateLogin({email,password});
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const token = await AuthService.login(email, password);
     
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
};

module.exports = AuthController;