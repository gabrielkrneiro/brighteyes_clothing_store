import { Request, Response, Router } from 'express'

import { IClientController } from '@src/interfaces'

export class ClientController implements IClientController {
  async init(route: Router): Promise<void> {
    route.get('/clients', this.list)
    route.post('/clients', this.create)
    route.get('/clients/:id', this.listOne)
    route.put('/clients/:id', this.update)
    route.delete('/clients/:id', this.remove)
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
