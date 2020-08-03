import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { EmployeeClientStatus } from './EmployeeClientStatus'

export class EmployeeClientStatusController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/employee-client-status', this.list)
    this.route.post('/employee-client-status', this.create)
    this.route.get('/employee-client-status/:id', this.listOne)
    this.route.put('/employee-client-status/:id', this.update)
    this.route.delete('/employee-client-status/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    try {
      const clientStatusRepo = getRepository(EmployeeClientStatus)
      const clientStatusList = await clientStatusRepo.find()
      return response.json(clientStatusList)
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
      const clientStatusId = request.params.id
      const clientStatusRepo = getRepository(EmployeeClientStatus)
      const foundClient = await clientStatusRepo.findOneOrFail({
        where: {
          id: clientStatusId,
        },
      })
      return response.json(foundClient)
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
      const clientStatusRepo = getRepository(EmployeeClientStatus)
      const createdClientStatus = await clientStatusRepo.save(data)
      return response.json({
        message: 'Client status created',
        data: createdClientStatus,
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
      const clientStatusId = request.params.id
      const clientStatusRepo = getRepository(EmployeeClientStatus)
      await clientStatusRepo.update(clientStatusId, data)
      const updatedClientStatus = await clientStatusRepo.findOneOrFail({
        where: { id: clientStatusId },
      })
      return response.json({
        message: 'Client status updated',
        data: updatedClientStatus,
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
      const clientStatusId = request.params.id
      const clientStatusRepo = getRepository(EmployeeClientStatus)
      const foundClientStatus = await clientStatusRepo.findOneOrFail(clientStatusId)
      await clientStatusRepo.remove(foundClientStatus)
      return response.json({
        message: 'Client status removed',
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json(error)
    }
  }
}
