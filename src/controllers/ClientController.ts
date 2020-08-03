import { Request, Response, Router } from 'express'
import { getRepository, Repository } from 'typeorm'

import { IClientController } from '@src/interfaces'

import { Client } from '@src/models/Client'

import { DTOController } from '@controllers/DTOController'

export class ClientController implements IClientController {
  route: Router
  repository: Repository<Client>

  constructor({ route }: DTOController) {
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/clients', this.list)
    this.route.post('/clients', this.create)
    this.route.get('/clients/:id', this.listOne)
    this.route.put('/clients/:id', this.update)
    this.route.delete('/clients/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    try {
      const clientRepo = getRepository(Client)
      const clientList = await clientRepo.find({ relations: ['status'] })
      return response.json(clientList)
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
      const clientId = request.params.id
      const clientRepo = getRepository(Client)
      const foundClient = await clientRepo.findOneOrFail({
        where: {
          id: clientId,
        },
        relations: ['status'],
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
      const clientRepo = getRepository(Client)
      const createdClient = await clientRepo.save(data)
      return response.json({
        message: 'Client created',
        data: createdClient,
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
      const clientId = request.params.id
      const clientRepo = getRepository(Client)
      await clientRepo.update(clientId, data)
      const updatedClient = await clientRepo.findOneOrFail({
        where: { id: clientId },
      })
      return response.json({
        message: 'Client updated',
        data: updatedClient,
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
      const clientId = request.params.id
      const clientRepo = getRepository(Client)
      const foundClient = await clientRepo.findOneOrFail(clientId)
      await clientRepo.remove(foundClient)
      return response.json({
        message: 'Client status removed',
      })
    } catch (error) {
      console.error(error)
      return response.status(401).json(error)
    }
  }
}
