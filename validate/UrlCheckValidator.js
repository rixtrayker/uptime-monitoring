const Joi = require('joi');

exports.validateCreate = function(url) {
    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP').required(),
        path: Joi.string().allow(null),
        port: Joi.number().integer().allow(null),
        webhook: Joi.string().allow(null),
        timeout: Joi.number().min(1).integer().allow(null).default(5),
        interval: Joi.number().integer().allow(null).default(10),
        threshold: Joi.number().integer().allow(null).default(1),
        authentication: Joi.object().allow(null),
        http_headers: Joi.object().allow(null),
        assert: Joi.object().allow(null),
        tags: Joi.array().items(Joi.string()).allow(null),
        ignore_ssl: Joi.boolean().allow(null).default(false),
    });
  
    return schema.validate(url);
  }

  