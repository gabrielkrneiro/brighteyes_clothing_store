import { Router } from 'express'

import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { AbstractController } from '@src/modules/abstract.controller'
import { Employee } from '@src/modules/employee/Employee'

export class EmployeeController extends AbstractController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    super()
    this.ModelClassName = Employee
    this.route = route
    this.findManyOptions = { relations: ['title', 'status'] }
    this.findOneOptions = { relations: ['title', 'status'] }
  }

  async init(): Promise<void> {
    this.route.get('/employees', this.list)
    this.route.post('/employees', this.create)
    this.route.get('/employees/:id', this.listOneById)
    this.route.put('/employees/:id', this.update)
    this.route.delete('/employees/:id', this.remove)
  }
}
