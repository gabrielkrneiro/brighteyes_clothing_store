import cors from 'cors'
import express, { Response, Router } from 'express'

import { IDb } from '@src/interfaces'

import { Db } from '@src/common'

import { DTOController } from '@controllers/DTOController'
import { ClientController } from '@controllers/ClientController'
import { ClientStatusController } from '@controllers/ClientStatusController'

export interface IApp {
  init(): Promise<void>
  start(): void
  initDatabase(): Promise<void>
  initMiddlewares(): void
}

export class App implements IApp {
  application: express.Application

  constructor() {
    this.application = express()
  }

  async init(): Promise<void> {
    this.initMiddlewares()
    await this.initDatabase()
    const route = Router()

    route.get('/', (_, response: Response) => {
      response.json({
        message: 'Server is running on port 3333',
        modules: {
          client: 'http://127.0.0.1:3333/clients/',
          'client-status': 'http://127.0.0.1:3333/client-status/',
        },
      })
    })

    await this.initModule(ClientStatusController, route)
    await this.initModule(ClientController, route)
  }

  async initModule(ControllerClassName: any, route: Router): Promise<void> {
    const controller = new ControllerClassName({
      route,
    } as DTOController)
    await controller.init()
    this.application.use(route)
    console.log('- Successfully loaded module ' + controller.constructor.name)
  }

  async initDatabase(): Promise<void> {
    const db: IDb = new Db()
    await db.init()
    console.log('- Successfully loaded Database')
  }

  initMiddlewares(): void {
    this.application.use(express.json())
    this.application.use(cors())
    console.log('- Successfully loaded Middlewares')
  }

  start(): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
