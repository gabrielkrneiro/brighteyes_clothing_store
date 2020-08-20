import { config } from 'dotenv'
config()

interface IAPP_CONFIG {
  jwtSecretkey: string
  serve: {
    port: number
    logLevel: string
  }
}

const APP_CONFIG = {
  jwtSecretkey: process.env.JWT_SECRET_KEY,
  serve: {
    port: parseInt(process.env.PORT || '3400'),
    logLevel: process.env.LOG_LEVEL || 'info'
  }
} as IAPP_CONFIG

export default APP_CONFIG
