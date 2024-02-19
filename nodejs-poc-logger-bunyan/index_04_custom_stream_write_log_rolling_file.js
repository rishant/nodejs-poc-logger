const bunyan = require('bunyan');
const rootPath = process.cwd();
const path = require('path');
const fs = require('fs');
const RotatingFileStream = require('rotating-file-stream');

// Create log directory
let logfileDirPath = path.join(rootPath, 'logs');
logfileDirPath = path.normalize(logfileDirPath);

if(!fs.existsSync(logfileDirPath)){
    console.log('Creating log directory');
    fs.mkdirSync(logfileDirPath);
    console.log('Created log directory');
}

// Create log file
let errorLogFileName = path.join(logfileDirPath, 'myapp-error.log');
errorLogFileName = path.normalize(errorLogFileName);

if(!fs.existsSync(errorLogFileName)){
    console.log('Creating log file');
    fs.writeFileSync(errorLogFileName, '');
    console.log('Created log file');
}else{
    console.log('log file already exists');
}

let logStream = RotatingFileStream.createStream(errorLogFileName, {
  // size: '1K',            // rotate every 20MB written
  // interval: '1d',         // rotate daily
  // compress: 'gzip'
  // period: '1d', // rotate daily
  // totalFiles: 10, // keep up to 10 rotated files
  // rotateExisting: true // Rotate the file even if it's empty
});

// Create a raw Bunyan stream
const rawCustomStream = {
  write: function (record) {
      // Write raw log record to the output stream
      /* Format: Json */
      logStream.write(JSON.stringify(record) + '\n');
      /* Format: Text */
      logStream.write(`${record.time.toISOString()} - ${bunyan.nameFromLevel[record.level]}: ${record.msg}\n`);
  }
};

// Create a Bunyan logger with custom rotating file stream
const logger = bunyan.createLogger({
  name: 'myApp',
  streams: [{
        level: 'info',
        stream: process.stdout   // log INFO and above to stdout
    }, {
        level: 'info',
        type: 'raw',
        stream: rawCustomStream // Use the custom rotating file stream for logging
    }]
});

// Logging messages with different levels
logger.trace('This is a TRACE message.');
logger.debug('This is a DEBUG message.');
logger.info('This is an INFO message.');
logger.warn('This is a WARN message.');
logger.error('This is an ERROR message.');
logger.fatal('This is a FATAL message.');