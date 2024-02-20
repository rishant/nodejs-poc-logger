const rootPath = process.cwd();
const path = require('path');
const {createLogger, transports, format} = require('winston');
const { timestamp, combine, errors, json } = format;

let logFileDirPath = path.join(rootPath, 'logs');
logFileDirPath = path.normalize(logFileDirPath);

let logFileName = path.join(logFileDirPath, 'app.log');
logFileName = path.normalize(logFileName);

// Create a logger instance
const logger = createLogger({
  level: 'debug', // Set the default logging level
  format: combine(
    // format.colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: logFileName }) // Log to a file
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
