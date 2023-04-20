import morgan from "morgan";

// Define logging format
const logFormat = ":method :url :status :response-time ms - :res[content-length]";

// Create logging middleware
const loggerMiddleware = morgan(logFormat);

export default loggerMiddleware;
