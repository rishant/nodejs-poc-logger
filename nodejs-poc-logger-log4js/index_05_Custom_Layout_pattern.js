const log4js = require('log4js');

// Logger configuration
log4js.configure({
    appenders: { 
        fileAppender: { 
            type: 'file', 
            filename: './logs/index_02.log', 
            layout : { 
                type: "pattern", 
                pattern: '[%d] %h %z [%p] %c - %m%n',
                /*
                pattern: '%[%r (%x{pid}) %p %c -%] %m%n',
                tokens: {
                    pid: function () {
                        return process.pid;
                    },
                },
                */ 
            }
        },
        consoleAppender: { type: 'console' }
    },
    categories: { 
        default: { 
            appenders: ['fileAppender', 'consoleAppender'], 
            level: 'info',
            // enableCallStack: true 
        } 
    }
});

// Create the logger
const logger = log4js.getLogger();
logger.level = 'info';

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');