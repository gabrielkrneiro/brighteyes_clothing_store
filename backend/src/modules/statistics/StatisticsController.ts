import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { AbstractController } from '@src/modules/abstract.controller'
import { Request, Response, Router } from 'express'
import { Client } from '../client/Client'
import { ClothesStatus } from '../clothes_status/ClothesStatus'


interface StatisticsResponse {
  getHowManyShoppingCartWhereCreatedInCurrentMonth(): number
  getWhichAreTheThreeMostValuableShoppingCart(): ShoppingCartValuable[]
  getThreeCustomerWhoBuyTheMostInCurrentMonth(): ClientValuable[]
  getQuantityInStockAndOutOfStockClothes(): ClothesAvailabilityMetrics[]
}

/**
 * Metrics:
 *  - How many shopping carts were created in current month?
 *  - Which are the most valuable shopping cart?
 *  - Which are the customers who buy the most?
 *  - Quantity of clothes in stock and out of stock
 *  - Quantity of clients activated and deactivated
 */

export class StatisticsController extends AbstractController implements IController {
  route: Router
  factory: any

  constructor({ route }: DTOController) {
    super()
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/statistics', this.getStatistics)
  }

  getHowManyShoppingCartWhereCreatedInCurrentMonth(): any {
    return
  }

  getStatistics = async (_: Request, res: Response): Promise<Response<StatisticsResponse>> => {
    return res.send('hello world')
  }
}
