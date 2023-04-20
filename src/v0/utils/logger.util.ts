import winston from "winston";
import { format } from "winston";

// Define log levels without 'trace'
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

// Define log colors
const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue"
};

// Get the current environment
const env = process.env.NODE_ENV || 'development'; // default to 'development' if NODE_ENV is not set

// Set the log level based on the current environment
const logLevel = env === 'production' ? 'info' : 'debug';

// Create logger instance
const logger = winston.createLogger({
  level: logLevel,
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple())
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

// Add log colors
winston.addColors(logColors);

export default logger;
