import { Connection, createConnection } from 'typeorm'

import { IDb } from '@src/common/database/IDb'

export class Db implements IDb {
  private instance: Connection

  async init(): Promise<void> {
    try {
      this.instance = await createConnection()
    } catch (error) {
      console.log('Error at try to connect in database...')
      throw error
    }
  }

  getInstance(): Connection {
    return this.instance
  }
}
