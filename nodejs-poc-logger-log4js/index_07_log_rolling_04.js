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
            backups: 1000000, // Set for kind of infinite backups
            daysToKeep: 0, // Set to 0 to ignore days to keep
            keepFileExt: true,
            fileNameSep: '-', // backup file number appending into file separator.
            compress: true, 
            pattern: "yyyy-MM-dd", // Added pattern for rolling file with compress
            // alwaysIncludePattern: true, // Adding pattern into filename parameter also
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