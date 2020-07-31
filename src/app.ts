import cors from 'cors'
import express, { Router } from 'express'

import { IDb } from '@src/interfaces'

import { ClientStatusController } from '@controllers/ClientStatusController'

import { Db } from '@src/common'
import { Connection } from 'typeorm'

export interface IApp {
  init(): Promise<void>
  start(): void
  initDatabase(): Promise<Connection>
  initMiddlewares(): void
}

interface ControllerConfigs {
  route: Router
  db: Connection
}

export class App implements IApp {
  application: express.Application

  constructor() {
    this.application = express()
  }

  async init(): Promise<void> {
    this.initMiddlewares()
    const db = await this.initDatabase()
    console.log('- Successfully loaded Database')

    const route = Router()
    const controllerConfigs: ControllerConfigs = { route, db }

    const clientStatusController = new ClientStatusController(controllerConfigs)
    await clientStatusController.init()
    this.application.use(route)
  }

  async initDatabase(): Promise<Connection> {
    const db: IDb = new Db()
    await db.init()
    return db.getInstance()
  }

  // async buildModule({ route, db, ControllerClassName }: ControllerConfigs): Promise<any> {
  //   const controller = new ControllerClassName({
  //     route,
  //     db,
  //   })
  //   await controller.init()
  //   console.log('- Successfully loaded', controller.constructor.name)
  //   return controller
  // }

  // async buildModule({
  //   route,
  //   db,
  //   ControllerClassName,
  //   ModelClassName,
  // }: DTOInitModule): Promise<void> {
  //   const repository = db.getRepository(ModelClassName)
  //   const controller = new ControllerClassName({
  //     route,
  //     repository,
  //   })
  //   await controller.init()
  //   console.log('- Successfully loaded', controller.constructor.name)
  // }

  initMiddlewares(): void {
    this.application.use(express.json())
    this.application.use(cors())
    console.log('- Successfully loaded Middlewares')
  }

  start(): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
