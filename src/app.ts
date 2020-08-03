import cors from 'cors'
import { config } from 'dotenv'
import express, { Response, Router } from 'express'

import { ClientController } from '@src/modules/client/ClientController'
import { DTOController } from '@src/common/dto/DTOController'
import { IDb } from '@src/common/database/IDb'
import { Db } from '@src/common/database/Db'
import { EmployeeClientStatusController } from '@src/modules/employee_client_status/EmployeeClientStatusController'
import { EmployeeController } from '@src/modules/employee/EmployeeController'
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
        message: `Server is running on port ${process.env.PORT}`,
        modules: {
          clients: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/clients/`,
          employees: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/employees/`,
          'client-status': `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/employee-client-status/`,
        },
      })
    })

    await this.initModule(EmployeeClientStatusController, route)
    await this.initModule(ClientController, route)
    await this.initModule(EmployeeController, route)
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
    config()
    this.application.use(express.json())
    this.application.use(cors())
    console.log('- Successfully loaded Middlewares')
  }

  start(): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
