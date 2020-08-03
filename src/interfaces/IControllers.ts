import { Request, Response, Router } from 'express'

export interface IController {
  init(route: Router): Promise<void>
  list(request: Request, response: Response): Promise<Response>
  listOne(request: Request, response: Response): Promise<Response>
  create(request: Request, response: Response): Promise<Response>
  update(request: Request, response: Response): Promise<Response>
  remove(request: Request, response: Response): Promise<Response>
}
