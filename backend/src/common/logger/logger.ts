import winston, { format, transports } from 'winston'
import APP_CONFIG from '@src/config/app.config'
import { LOG_LEVEL } from './logger.enum'
const { combine, splat, timestamp, printf, colorize, uncolorize } = format

const loggerConfigs = {
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  serviceName: 'auth-service',
  errorLogFilename: 'logs/error.log',
  generalLogFilename: 'logs/combined.log'
}

const myFormat = printf(({ level, message, timestamp }) => {
  let msg = `${timestamp} | ${level} | `
  if (typeof message !== 'string' && typeof message !== 'number') {
    msg += JSON.stringify(message)
  } else {
    msg += message
  }
  return msg
})

const logger = winston.createLogger({
  level: APP_CONFIG.serve.logLevel,
  format: combine(colorize(), splat(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
  transports: [
    new transports.Console({
      format: myFormat
    }),
    new transports.File({
      filename: loggerConfigs.errorLogFilename,
      level: LOG_LEVEL.ERROR
    }),
    new transports.File({
      filename: loggerConfigs.generalLogFilename,
      format: combine(uncolorize(), myFormat)
    })
  ]
})

export default logger
