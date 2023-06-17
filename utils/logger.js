require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format;
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' });

const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    logFormat
  ),
  transports: [
    new transports.File({
      filename: './log/info.log',
      level: 'info'
    }),
    new transports.File({
      filename: './log/errors.log',
      level: 'error'
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: './log/exceptions.log' }),
    new transports.Console()
  ]
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});

const morganFormat = ':method :url :status :response-time ms - :res[content-length]';
logger.middleware = morgan(morganFormat, { stream: accessLogStream });

module.exports = logger;
