import { Request, Response } from 'express'

import { IClientController } from '@src/interfaces'

export class ClientController implements IClientController {
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
