import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { AbstractController } from '@src/modules/abstract.controller'
import { Request, Response, Router } from 'express'
import { Client } from '../client/Client'
import { ClothesStatusEnum } from '../clothes_status/ClothesStatusEnum'
import { EnumEmployeeClientStatus } from '../employee_client_status/IEmployeeClientStatus'

import { 
  ClientAvailability,
  ClientValuable, 
  ClothesAvailabilityMetrics, 
  ShoppingCartValuable 
} from './StatisticsInterface'

interface IStatisticsController {
  getHowManyShoppingCartWhereCreatedInCurrentMonth(): number
  getShoppingCartRanking(): ShoppingCartValuable[]
  getThreeCustomerWhoBuyTheMostInCurrentMonth(): ClientValuable[]
  getQuantityInStockAndOutOfStockClothes(): ClothesAvailabilityMetrics[]
  getQuantityOfClientActivatedAndDeactivated(): ClientAvailability[]
}

interface StatisticsResponse {
  data: {
    number_of_shopping_carts_created_current_month: number,
    shopping_cart_rank: ShoppingCartValuable[],
    customer_rank: ClientValuable[],
    clothes_availability_quantity: ClothesAvailabilityMetrics[],
    client_availability_quantity: ClientAvailability[]
  }
}

/**
 * Metrics:
 *  - How many shopping carts were created in current month?
 *  - Which are the most valuable shopping cart?
 *  - Which are the customers who buy the most?
 *  - Quantity of clothes in stock and out of stock
 *  - Quantity of clients activated and deactivated
 */

export class StatisticsController extends AbstractController implements IController, IStatisticsController {
  route: Router
  factory: any

  constructor({ route }: DTOController) {
    super()
    this.route = route
  }

  async init(): Promise<void> {
    this.route.get('/statistics', this.getStatistics)
  }

  getShoppingCartRanking(): ShoppingCartValuable[] {
    return [
      {
        shoppingCartId: 1,
        value: 18
      },
      {
        shoppingCartId: 2,
        value: 17
      },
      {
        shoppingCartId: 3,
        value: 16
      }
    ]
  }

  getThreeCustomerWhoBuyTheMostInCurrentMonth(): ClientValuable[] {
    const c1 = new Client()
    const c2 = new Client()
    const c3 = new Client()

    const cl = [c1,c2,c3]

    for (let i = 0; i < cl.length; i++) {
      cl[i].id = i
      cl[i].name = 'blabla',
      cl[i].address = 'lero lero'
    }

    return [
      {
        client: c1,
        value: 16
      },
      {
        client: c2,
        value: 15
      },
      {
        client: c3,
        value: 14
      }
    ]
  }

  getQuantityInStockAndOutOfStockClothes(): ClothesAvailabilityMetrics[] {
    return [
      {
        status: ClothesStatusEnum.IN_STOCK,
        quantity: 15
      },
      {
        status: ClothesStatusEnum.OUT_OF_STOCK,
        quantity: 5
      }
    ]
  }

  getHowManyShoppingCartWhereCreatedInCurrentMonth(): number {
    return 5;
  }

  getQuantityOfClientActivatedAndDeactivated(): ClientAvailability[] {
    return [
      {
        quantity: 2,
        status: EnumEmployeeClientStatus.ACTIVATED
      },
      {
        quantity: 1,
        status: EnumEmployeeClientStatus.DEACTIVATED
      }
    ]
  }

  getStatistics = async (_: Request, res: Response): Promise<Response<StatisticsResponse>> => {

    const number_of_shopping_carts_created_current_month = this.getHowManyShoppingCartWhereCreatedInCurrentMonth()
    const clothes_availability_quantity = this.getQuantityInStockAndOutOfStockClothes()
    const customer_rank = this.getThreeCustomerWhoBuyTheMostInCurrentMonth()
    const shopping_cart_rank = this.getShoppingCartRanking()
    const client_availability_quantity = this.getQuantityOfClientActivatedAndDeactivated()

    const response = { 
      data: { 
        number_of_shopping_carts_created_current_month,
        clothes_availability_quantity,
        customer_rank,
        shopping_cart_rank,
        client_availability_quantity
      } 
    } as StatisticsResponse

    return res.json(response)
  }
}
