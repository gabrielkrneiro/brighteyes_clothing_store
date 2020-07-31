import cors from 'cors'
import express, { Router } from 'express'

import { IDb } from '@src/interfaces'

import { ClientStatusController } from '@controllers/ClientStatusController'

import { ClientController } from '@controllers/ClientController'

import { Db } from '@src/common'

export interface IApp {
  init(): Promise<void>
  start(): void
  initDatabase(): Promise<void>
  initMiddlewares(): void
  initControllers(): void
}

export class App implements IApp {
  application: express.Application

  constructor() {
    this.application = express()
  }

  async init(): Promise<void> {
    this.initMiddlewares()
    await this.initDatabase()
    await this.initControllers()
  }

  initMiddlewares(): void {
    this.application.use(express.json())
    this.application.use(cors())
    console.log('- Successfully loaded Middlewares')
  }

  async initDatabase(): Promise<void> {
    const db: IDb = new Db()
    await db.init()
    this.application.set('db', db.getInstance())
    console.log('- Successfully loaded Database')
  }

  async initControllers(): Promise<void> {
    const route = Router()
    const clientStatusController = new ClientStatusController()
    await clientStatusController.init(route)

    const clientController = new ClientController()
    await clientController.init(route)

    this.application.use(route)
    console.log('- Successfully loaded Controllers')
  }

  start(): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
