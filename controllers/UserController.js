const Joi = require('joi');
const UserService = require('../services/UserService');
const { StatusCodes } = require('http-status-codes');


const UserController = {

  async createUser(req, res) {
    try {
      const { error: validationError } = validateUser(req.body);
      if (validationError) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: validationError.details[0].message });
        return;
      }

      const { name, email, password } = req.body;
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        res.status(StatusCodes.CONFLICT).json({ error: 'User with the provided email already exists' });
        return;
      }

      const isValidEmail = await UserService.verifyEmail(email);
      if (!isValidEmail) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid email address' });
        return;
      }

      const user = await UserService.createUser(name, email, password);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  },

  async verifyEmail(req, res){
    const success = await UserService.verifyEmail(req.token);
    if(!success){
      return res.status(StatusCodes.NOT_FOUND).json({message:"Wrong link or expired link or verified"});
    }

    res.status(StatusCodes.OK).json({message:"Your email verified"});
  }
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}

module.exports = UserController;
