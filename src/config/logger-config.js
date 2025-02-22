const {createLogger, format, transports} = require("winston");
const {combine, timestamp, label, printf} = format;

// Define symbols for log levels
const levelSymbols = {
    error: "❌", // Red Cross for errors
    warn: "⚠️", // Warning sign for warnings
    info: "📝", // Information icon
    debug: "🐞", // Bug icon for debugging
};

const customFormat = printf(({level, message, timestamp}) => {
    const symbol = levelSymbols[level] || ""; // Get the symbol or empty if not found
    return `${timestamp} : ${symbol} ${level.toUpperCase()} : ${message}`;
});

const logger = createLogger({
    format: combine(timestamp({format: "YYYY-MM-DD HH:mm:ss"}), customFormat),
    transports: [new transports.Console(), new transports.File({filename: "combined.log"})],
});

module.exports = logger;
