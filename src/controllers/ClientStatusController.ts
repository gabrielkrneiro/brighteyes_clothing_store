import { IClientStatusController } from '@src/interfaces'
import { Request, Response, Router } from 'express'
import { DTOController } from '@controllers/DTOController'
import { ClientStatus } from '@src/models'
import { Connection, Repository } from 'typeorm'

export class ClientStatusController implements IClientStatusController {
  route: Router
  db: Connection
  repository: Repository<ClientStatus>

  constructor({ route, db }: DTOController<ClientStatus>) {
    this.route = route
    this.db = db
    this.repository = db.getRepository(ClientStatus)
  }

  async init(): Promise<void> {
    this.route.get('/clients-status', this.list)
    this.route.post('/clients-status', this.create)
    this.route.get('/clients-status/:id', this.listOne)
    this.route.put('/clients-status/:id', this.update)
    this.route.delete('/clients-status/:id', this.remove)
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
