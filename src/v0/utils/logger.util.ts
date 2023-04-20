import winston from "winston";
import { format } from "winston";

// Define log levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
    trace: "magenta"
  }
};

// Create logger instance
const logger = winston.createLogger({
  level: "info",
  levels: logLevels.levels,
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

export default logger;
