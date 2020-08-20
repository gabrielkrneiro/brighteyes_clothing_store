import { Router } from 'express'

import { IController } from './../../interfaces/IControllers'
import { DTOController } from './../../common/dto/DTOController'
import { AbstractController } from '../abstract.controller'
import { Clothes } from './Clothes'

export class ClothesController extends AbstractController implements IController {
  route: Router

  constructor({ route }: DTOController) {
    super()
    this.route = route
    this.ModelClassName = Clothes
  }

  async init(): Promise<void> {
    this.route.get('/clothes', this.list)
    this.route.post('/clothes', this.create)
    this.route.get('/clothes/:id', this.listOneById)
    this.route.put('/clothes/:id', this.update)
    this.route.delete('/clothes/:id', this.remove)
  }
}
