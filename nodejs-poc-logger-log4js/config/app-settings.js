const appSettings = {

        log4js: {
            log4jsLogConfig: {
                appenders: {
                    fileAppender: { 
                        type: 'file', 
                        filename: './logs/app.log',
                        maxLogSize: 10485760,
                        backups: 3,
                        compress: true
                    },
                    consoleAppender: { type: 'console' }
                },
                categories: {
                    default: { 
                        appenders: ['fileAppender', 'consoleAppender'], 
                        level: 'trace'
                    }
                }
            }
        }
    };
    
    module.exports = appSettings;