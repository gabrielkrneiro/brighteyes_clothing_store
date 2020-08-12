import cors from 'cors'
import { config } from 'dotenv'
import express, { Response, Router } from 'express'

import { ClientController } from '@src/modules/client/ClientController'
import { DTOController } from '@src/common/dto/DTOController'
import { IDb } from '@src/common/database/IDb'
import { Db } from '@src/common/database/Db'
import { EmployeeClientStatusController } from '@src/modules/employee_client_status/EmployeeClientStatusController'
import { EmployeeController } from '@src/modules/employee/EmployeeController'
import { EmployeeTitleController } from './modules/employee_title/EmployeeTitleController'
import { ShoppingCartStatusController } from './modules/shopping_cart_status/ShoppingCartStatusController'
import { ClothesStatusController } from './modules/clothes_status/ClothesStatusController'
import { ClothesController } from './modules/clothes/ClothesController'
import { ShoppingCartController } from './modules/shopping-cart/ShoppingCartController'
import { SeedRunner } from './common/seeds/SeedRunner'
import { ClothesStatusSeeder } from './common/seeds/ClothesStatusSeeder'
import { runSeeders } from './common/seeds/runSeeders'
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

    await this.initApiSummarize(route)

    await this.initModule(ClientController, route)
    await this.initModule(ClothesController, route)
    await this.initModule(ClothesStatusController, route)
    await this.initModule(EmployeeController, route)
    await this.initModule(EmployeeClientStatusController, route)
    await this.initModule(EmployeeTitleController, route)
    await this.initModule(ShoppingCartStatusController, route)
    await this.initModule(ShoppingCartController, route)
  }

  async initApiSummarize(route: Router): Promise<void> {
    route.get('/run-seeders', (_, response: Response) => {
      try {
        runSeeders()
        return response.json({ message: 'Database seeded successfully' })
      } catch (error) {
        console.error(error.message)
        return response.json({ message: error.message })
      }
    })

    route.get('/', (_, response: Response) => {
      response.json({
        message: `Server is running on port ${process.env.PORT}`,
        modules: {
          clients: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/clients/`,
          clothes: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/clothes/`,
          clothes_status: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/clothes-status/`,
          employees: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/employees/`,
          employee_client_status: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/employee-client-status/`,
          employee_title: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/employee-title/`,
          shopping_cart_status: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/shopping-cart-status/`,
          shopping_cart: `http://${process.env.HOST_ADDRESS}:${process.env.PORT}/shopping-cart/`,
        },
      })
    })
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
