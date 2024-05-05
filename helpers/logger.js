// Importing the required modules.
const log4js = require('log4js');
const errorFile = 'serverLogs/error.log';
const warningFile = 'serverLogs/warn.log';
const infoFile = 'serverLogs/info.log';

// Configuration for Log4js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    errorFile: { type: 'file', filename: errorFile, level: 'error' },
    warnFile: { type: 'file', filename: warningFile, level: 'warn' },
    infoFile: { type: 'file', filename: infoFile, level: 'info' }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    error: { appenders: ['errorFile'], level: 'error' },
    warn: { appenders: ['warnFile'], level: 'warn' },
    info: { appenders: ['infoFile'], level: 'info' }
  }
});

// Create loggers for different levels of data logging.
const errorLogger = log4js.getLogger('error');
const warnLogger = log4js.getLogger('warn');
const infoLogger = log4js.getLogger('info');

// Helper function to log messages.
const logMessage = (level, message) => {
  switch (level) {
    case 'error':
      // Setting logger to error logs and writing to error logger file.
      errorLogger.error(message);
      break;
    case 'warn':
      // Setting logger to warn logs and writing to warn logger file.
      warnLogger.warn(message);
      break;
    case 'info':
      // Setting logger to info logs and writing to info logger file.
      infoLogger.info(message);
      break;
    default:
      infoLogger.info(message); // Default to info level for handling untyped logs.
  }
};

// Exporting the logger function
module.exports = logMessage;
