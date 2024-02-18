const log4js = require('log4js');

// App settings
const { log4jsLogConfig } = require('./config/app-settings').log4js;

// Logger configuration
log4js.configure(log4jsLogConfig);

// Create the logger
const logger = log4js.getLogger();

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');