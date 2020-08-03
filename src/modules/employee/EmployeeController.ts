import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { Employee } from '@src/modules/employee/Employee'

export class EmployeeController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/employees', this.list)
    this.route.post('/employees', this.create)
    this.route.get('/employees/:id', this.listOne)
    this.route.put('/employees/:id', this.update)
    this.route.delete('/employees/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    try {
      const employeeRepo = getRepository(Employee)
      const employeeList = await employeeRepo.find()
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
      const employeeId = request.params.id
      const employeeRepo = getRepository(Employee)
      const foundEmployee = await employeeRepo.findOneOrFail({
        where: {
          id: employeeId,
        },
      })
      return response.json(foundEmployee)
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
      const employeeRepo = getRepository(Employee)
      const employeeStatus = await employeeRepo.save(data)
      return response.json({
        message: 'Employee created',
        data: employeeStatus,
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
      const employeeId = request.params.id
      const employeeRepo = getRepository(Employee)
      await employeeRepo.update(employeeId, data)
      const updatedEmployee = await employeeRepo.findOneOrFail({
        where: { id: employeeId },
      })
      return response.json({
        message: 'Employee updated',
        data: updatedEmployee,
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
      const employeeId = request.params.id
      const employeeRepo = getRepository(Employee)
      const foundEmployee = await employeeRepo.findOneOrFail(employeeId)
      await employeeRepo.remove(foundEmployee)
      return response.json({
        message: 'Employee removed',
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json(error)
    }
  }
}
