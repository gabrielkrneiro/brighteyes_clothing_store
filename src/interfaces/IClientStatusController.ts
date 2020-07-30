import { Request, Response } from 'express'

export interface IClientStatusController {
  list(request: Request, response: Response): Promise<Response>
  listOne(request: Request, response: Response): Promise<Response>
  create(request: Request, response: Response): Promise<Response>
  update(request: Request, response: Response): Promise<Response>
  remove(request: Request, response: Response): Promise<Response>
}
