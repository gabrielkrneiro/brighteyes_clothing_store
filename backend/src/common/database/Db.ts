import { Connection, createConnection } from 'typeorm'

import { IDb } from '@src/common/database/IDb'
import logger from '../logger/logger'

export class Db implements IDb {
  private instance: Connection

  async init(): Promise<void> {
    try {
      this.instance = await createConnection()
    } catch (error) {
      logger.error('Error at try to connect in database...')
      throw error
    }
  }

  getInstance(): Connection {
    return this.instance
  }
}
