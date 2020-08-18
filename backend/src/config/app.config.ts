import { config } from 'dotenv'
config()

interface IAPP_CONFIG {
  jwtSecretkey: string
}

const APP_CONFIG = {
  jwtSecretkey: process.env.JWT_SECRET_KEY,
} as IAPP_CONFIG

export default APP_CONFIG
