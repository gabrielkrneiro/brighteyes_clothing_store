import cors from 'cors'
import express from 'express'

import { IApp, IDb } from '@src/interfaces'
import { Db } from '@src/common'
import route from '@src/routes'

export class App implements IApp {
  application: express.Application

  constructor() {
    this.application = express()
  }

  async init(): Promise<void> {
    this.initMiddlewares()
    this.initDatabase()
    this.initRoutes()
  }

  initMiddlewares(): void {
    this.application.use(express.json())
    this.application.use(cors())
    console.log('- Successfully loaded Middlewares')
  }

  async initDatabase(): Promise<void> {
    const db: IDb = new Db()
    await db.init()
    console.log('- Successfully loaded Database')
  }

  initRoutes(): void {
    this.application.get('/', (_, response) => response.json({ message: 'Hello world' }))
    this.application.use(route)
    console.log('- Successfully loaded Routes')
  }

  start(): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
