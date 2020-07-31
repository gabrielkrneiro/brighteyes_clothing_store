import { IClientStatusController } from '@src/interfaces'
import { Request, Response, Router } from 'express'

export class ClientStatusController implements IClientStatusController {
  async init(route: Router): Promise<void> {
    route.get('/clients-status', this.list)
    route.post('/clients-status', this.create)
    route.get('/clients-status/:id', this.listOne)
    route.put('/clients-status/:id', this.update)
    route.delete('/clients-status/:id', this.remove)
  }

  async list(_: Request, response: Response): Promise<Response> {
    return response.json('Listing client status...')
  }

  async listOne(_: Request, response: Response): Promise<Response> {
    return response.json('Listing one client status...')
  }

  async create(_: Request, response: Response): Promise<Response> {
    return response.json('Create client status...')
  }

  async update(_: Request, response: Response): Promise<Response> {
    return response.json('Update client status...')
  }

  async remove(_: Request, response: Response): Promise<Response> {
    return response.json('Remove client status...')
  }
}
