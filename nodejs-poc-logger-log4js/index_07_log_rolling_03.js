const log4js = require('log4js');

log4js.addLayout("json", function (config) {
    return function (logEvent) {
      return JSON.stringify(logEvent) + config.separator;
    };
});

// Logger configuration
log4js.configure({
    appenders: { 
        fileAppender: { 
            type: 'file', 
            filename: './logs/index_02.log',
            // maxLogSize: 10485760, // 10MB
            maxLogSize: 2048,
            backups: 5,
            daysToKeep: 5, // Number of days to keep compressed log files.
            keepFileExt: true,
            // fileNameSep: '-', // backup file number appending into file separator.
            compress: true, 
            layout : { type: "json", separator: "" }
        },
        consoleAppender: { 
            type: 'console', 
            layout: { type: "json", separator: "," } 
        }
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
// logger.level = 'info';

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');