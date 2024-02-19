const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // You can choose the format of your logs here
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
  ]
});

// Example usage
logger.log('info', 'This is an informational message.');
logger.log('error', 'This is an error message.');

// You can also use shortcut methods for different log levels
logger.info('This is an informational message.');
logger.error('This is an error message.');
