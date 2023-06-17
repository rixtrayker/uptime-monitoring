const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Monitoring Service API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['../routes/*.js>'],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
