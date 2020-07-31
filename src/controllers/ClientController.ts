import { Request, Response, Router } from 'express'

import { IClientController } from '@src/interfaces'
import { Repository } from 'typeorm'
import { Client } from '@src/models/Client'
import { DTOController } from './DTOController'

export class ClientController implements IClientController {
  route: Router
  repository: Repository<Client>

  constructor({ route, repository }: DTOController<Client>) {
    this.route = route
    this.repository = repository
  }

  async init(): Promise<void> {
    this.route.get('/clients', this.list)
    this.route.post('/clients', this.create)
    this.route.get('/clients/:id', this.listOne)
    this.route.put('/clients/:id', this.update)
    this.route.delete('/clients/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    return response.json('Listing clients ...')
  }

  async listOne(_: Request, response: Response): Promise<Response> {
    return response.json('Listing one clients ...')
  }

  async create(_: Request, response: Response): Promise<Response> {
    return response.json('Create clients ...')
  }

  async update(_: Request, response: Response): Promise<Response> {
    return response.json('Update clients ...')
  }

  async remove(_: Request, response: Response): Promise<Response> {
    return response.json('Remove clients ...')
  }
}
