const rootPath = process.cwd();
const path = require('path');
const {createLogger, transports, format} = require('winston');
const { timestamp, combine, errors, json } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

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
    // new transports.File({ filename: logFileName }), // Log to a file
    new DailyRotateFile({
      filename: `${path.join(logFileDirPath, 'app-%DATE%.log')}`,
      datePattern: 'YYYY-MM-DD-HH',
      // datePattern: 'YYYY',
      zippedArchive: true,
      maxSize: '1k',
      maxFiles: '365d'
    }),
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
