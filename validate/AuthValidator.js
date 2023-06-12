const Joi = require('joi');

exports.validateSignup = function(user) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(user);
  }
  
exports.validateLogin = function(user) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  
    return schema.validate(user);
  }
  