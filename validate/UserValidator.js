const Joi = require('joi');

exports.validateUpdateUser = function(user) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
    });

    return schema.validate(user);
}