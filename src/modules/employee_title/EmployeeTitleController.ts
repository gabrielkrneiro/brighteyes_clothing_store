import { getRepository } from 'typeorm'
import { Request, Response, Router } from 'express'

import { DTOController } from '@src/common/dto/DTOController'

import { IController } from '@src/interfaces/IControllers'

import { EmployeeTitle } from '@src/modules/employee_title/EmployeeTitle'

export class EmployeeTitleController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/employee-title', this.list)
    this.route.post('/employee-title', this.create)
    this.route.get('/employee-title/:id', this.listOne)
    this.route.put('/employee-title/:id', this.update)
    this.route.delete('/employee-title/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    try {
      const employeeTitleRepo = getRepository(EmployeeTitle)
      const employeeList = await employeeTitleRepo.find()
      return response.json(employeeList)
    } catch (error) {
      console.error(error)
      return response.status(401).json({
        message: 'an error occurred',
        error_message: error.message,
      })
    }
  }

  async listOne(request: Request, response: Response): Promise<Response> {
    try {
      const employeeTitleId = request.params.id
      const employeeTitleRepo = getRepository(EmployeeTitle)
      const foundEmployeeTitle = await employeeTitleRepo.findOneOrFail({
        where: {
          id: employeeTitleId,
        },
      })
      return response.json(foundEmployeeTitle)
    } catch (error) {
      console.error(error)
      return response.status(401).json({
        message: 'an error occurred',
        error_message: error.message,
      })
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body
      const employeeTitleRepo = getRepository(EmployeeTitle)
      const createdEmployeeTitle = await employeeTitleRepo.save(data)
      return response.json({
        message: 'Employee Title created',
        data: createdEmployeeTitle,
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json({
        message: 'An error occurred',
        error_message: error.message,
      })
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body
      const employeeTitleId = request.params.id
      const employeeTitleRepo = getRepository(EmployeeTitle)
      await employeeTitleRepo.update(employeeTitleId, data)
      const updatedEmployeeTitle = await employeeTitleRepo.findOneOrFail({
        where: { id: employeeTitleId },
      })
      return response.json({
        message: 'Employee Title updated',
        data: updatedEmployeeTitle,
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json({
        message: 'An error occurred',
        error_message: error.message,
      })
    }
  }

  async remove(request: Request, response: Response): Promise<Response> {
    try {
      const employeeTitleId = request.params.id
      const employeeTitleRepo = getRepository(EmployeeTitle)
      const foundEmployeeTitle = await employeeTitleRepo.findOneOrFail(employeeTitleId)
      await employeeTitleRepo.remove(foundEmployeeTitle)
      return response.json({
        message: 'Employee Title removed',
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json(error)
    }
  }
}
