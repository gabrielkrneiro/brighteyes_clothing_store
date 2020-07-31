import { IController } from '@src/interfaces/IControllers'
import { Request, Response, Router } from 'express'

export abstract class AbstractController implements IController {
  abstract init(route: Router): Promise<void>
  abstract list(request: Request, response: Response): Promise<Response>
  abstract listOne(request: Request, response: Response): Promise<Response>
  abstract create(request: Request, response: Response): Promise<Response>
  abstract update(request: Request, response: Response): Promise<Response>
  abstract remove(request: Request, response: Response): Promise<Response>
}
