const winston = require('winston');
const rootPath = process.cwd();
const path = require('path');

let logFileDirPath = path.join(rootPath, 'logs');
logFileDirPath = path.normalize(logFileDirPath);

let logFileName = path.join(logFileDirPath, 'app.log');
logFileName = path.normalize(logFileName);

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // You can choose the format of your logs here
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: logFileName}) // Log to a file
  ]
});

// Example usage
logger.log('info', 'This is an informational message.');
logger.log('error', 'This is an error message.');

// Logging messages with different levels
// logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
// logger.fatal('This is a FATAL message.');
