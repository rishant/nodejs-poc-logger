const bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name: 'myapp',
    stream: process.stdout,
    level: 'info'
});

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');