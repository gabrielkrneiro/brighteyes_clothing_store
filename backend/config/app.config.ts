import { config } from 'dotenv'
config()
import fs from 'fs'
import path from 'path'
import logger from '@src/common/logger/logger'

function readVersionFile(): string {
  const versionFilePath = path.resolve(__dirname, '..', '.version')
  let versionFile: string = ''
  fs.readFile(versionFilePath, 'utf8', (error, vf) => {
    if (error) {
      logger.error(error.message)
    }
    versionFile = vf
  })
  return versionFile
}

interface IAPP_CONFIG {
  jwtSecretkey: string
  version: string
  serve: {
    host: string
    port: number
    logLevel: string
  }
}

const APP_CONFIG = {
  jwtSecretkey: process.env.JWT_SECRET_KEY,
  version: readVersionFile(),
  serve: {
    host: process.env.HOST_ADDRESS || '0.0.0.0',
    port: parseInt(process.env.PORT || '3400'),
    logLevel: process.env.LOG_LEVEL || 'info'
  }
} as IAPP_CONFIG

export default APP_CONFIG
