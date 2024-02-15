import { type Logger, createLogger, transports, format } from "winston";

const { timestamp, combine, printf, errors } = format

function logger(): Logger {
    const logFormat = printf(
        ({ level, message, timestamp, stack }) => 
            `${timestamp} ${level}: ${Boolean(stack) || message}`
    )

    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYY-MM-DD HH:mm:ss'}),
            errors({ stack: true }),
            logFormat,
        ),
        transports: [new transports.Console()],
    })
}

export default logger