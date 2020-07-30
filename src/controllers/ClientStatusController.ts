import { IClientStatusController } from '@src/interfaces'
import { Request, Response } from 'express'

export class ClientStatusController implements IClientStatusController {
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
