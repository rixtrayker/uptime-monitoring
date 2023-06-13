const  s = require('../services/UserService');
const { StatusCodes } = require('http-status-codes');


const UrlCheckController =  {

    async deleteUrl(req, res){
        const success = await .deleteUser(req.id);
        if(!success){
          return res.status(StatusCodes.NOT_FOUND).json({message:"User not found"});
        }
    
        res.status(StatusCodes.OK).json({message:"Deleted successfully"});
      },
};

module.exports = UserController;
