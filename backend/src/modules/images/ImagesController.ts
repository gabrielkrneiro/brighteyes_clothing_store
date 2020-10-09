import { Request, Response, Router } from 'express'
import path from 'path'

import { IController } from './../../interfaces/IControllers'
import { DTOController } from './../../common/dto/DTOController'
import { AbstractController } from '../abstract.controller'
import APP_CONFIG from '@src/config/app.config'

export class ImagesController extends AbstractController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    super()
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/images', this.list)
    this.route.get('/images/clothes/:filename', this.details)
  }

  details = async (req: Request, res: Response): Promise<Response<any>> => {
    const { filename } = req.params
    const filePath = path.join(APP_CONFIG.images, filename)
    console.log(filePath)
    return res.send('')
  }
}
