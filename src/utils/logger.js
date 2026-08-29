const isDev = import.meta.env.DEV;

const LogLevel = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
};

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
  }

  log(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      meta,
    };

    this.logs.push(logEntry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    const consoleMethod = console[level] || console.log;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (isDev) {
      consoleMethod(`${prefix} ${message}`, meta);
    } else if (level === LogLevel.ERROR || level === LogLevel.WARN) {
      consoleMethod(`${prefix} ${message}`, meta);
    }
  }

  error(message, meta) {
    this.log(LogLevel.ERROR, message, meta);
  }

  warn(message, meta) {
    this.log(LogLevel.WARN, message, meta);
  }

  info(message, meta) {
    this.log(LogLevel.INFO, message, meta);
  }

  debug(message, meta) {
    this.log(LogLevel.DEBUG, message, meta);
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

const logger = new Logger();

export default logger;
