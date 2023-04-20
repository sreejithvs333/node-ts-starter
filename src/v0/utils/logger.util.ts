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

// Create logger instance
const logger = winston.createLogger({
  level: "info", // Set log level to 'info'
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
