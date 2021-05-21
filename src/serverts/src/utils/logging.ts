import winston from "winston";
const { combine, timestamp, label, printf, colorize, metadata, json } = winston.format;

export const logger = winston.createLogger({
    level: "info",
    format: combine(
        colorize(),
        timestamp(),
        json(),
        printf((info) => `${info.timestamp} [${info.level}]: ${info["service"]}Service: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});
