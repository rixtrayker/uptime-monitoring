const UserService = require('../services/UserService');
const { StatusCodes } = require('http-status-codes');
const { validateUpdateUser } = require('../validate/UserValidator');

const UserController = {

  async updateUser(req, res) {
    try {
      const { name, email, password } = req.body; 

      const { error } = validateUpdateUser({ name, email, password });
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      const isValidEmail = await UserService.validEmail(req.id, email);
      if (!isValidEmail) {
        res.status(StatusCodes.CONFLICT).json({ error: 'Invalid email address' });
        return;
      }

      const user = await UserService.updateUser(req.id,{ name, email, password });
      res.status(StatusCodes.ok).json(user);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  },

  async deleteUser(req, res){
    const success = await UserService.deleteUser(req.id);
    if(!success){
      return res.status(StatusCodes.NOT_FOUND).json({message:"User not found"});
    }

    res.status(StatusCodes.OK).json({message:"Deleted successfully"});
  },
}

module.exports = UserController;
