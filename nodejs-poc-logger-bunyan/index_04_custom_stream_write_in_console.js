const bunyan = require('bunyan');
const rootPath = process.cwd();
const path = require('path');
const fs = require('fs');

/* 
    Note:
        raw: Similar to a "stream" writable stream, except that the write method is given raw log record Objects 
        instead of a JSON-stringified string. This can be useful for hooking on further processing to all Bunyan 
        logging: pushing to an external service etc.
*/

// Create a writable stream
const outputStream = process.stdout;

// Create a raw Bunyan stream
const rawCustomStream = {
    write: function (record) {
        // Write raw log record to the output stream
        /* Format: Json */
        // outputStream.write(JSON.stringify(record) + '\n');
        /* Format: Text */
        outputStream.write(`${record.time.toISOString()} - ${bunyan.nameFromLevel[record.level]}: ${record.msg}\n`);
    }
};

const logger = bunyan.createLogger({
    name: 'myapp',
    streams: [{
        level: 'info',
        stream: process.stdout   // log INFO and above to stdout
    }, {
        level: 'info',
        type: 'raw',
        stream: rawCustomStream
    }]
});

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');