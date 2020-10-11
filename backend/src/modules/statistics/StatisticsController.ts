import { DTOController } from '@src/common/dto/DTOController'
import { IController } from '@src/interfaces/IControllers'
import { AbstractController } from '@src/modules/abstract.controller'
import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { Client } from '../client/Client'
import { Clothes } from '../clothes/Clothes'
import { ClothesStatus } from '../clothes_status/ClothesStatus'
import { ClothesStatusEnum } from '../clothes_status/ClothesStatusEnum'
import { EnumEmployeeClientStatus } from '../employee_client_status/IEmployeeClientStatus'

import { 
  ClientAvailability,
  ClientValuable, 
  ClothesAvailabilityMetrics, 
  ShoppingCartValuable 
} from './StatisticsInterface'

interface IStatisticsController {
  getHowManyShoppingCartWhereCreatedInCurrentMonth(): Promise<number>
  getShoppingCartRanking(): Promise<ShoppingCartValuable[]>
  getThreeCustomerWhoBuyTheMostInCurrentMonth(): Promise<ClientValuable[]>
  getQuantityInStockAndOutOfStockClothes(): Promise<ClothesAvailabilityMetrics[]>
  getQuantityOfClientActivatedAndDeactivated(): Promise<ClientAvailability[]>
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

  async getShoppingCartRanking(): Promise<ShoppingCartValuable[]> {
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

  async getThreeCustomerWhoBuyTheMostInCurrentMonth(): Promise<ClientValuable[]> {
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

  async getQuantityInStockAndOutOfStockClothes(): Promise<ClothesAvailabilityMetrics[]> {
    const clothesRepo = getRepository(Clothes)
    const clothesStatusRepo = getRepository(ClothesStatus)

    const inStockStatus = await clothesStatusRepo.findOne({ 
      where: { name: ClothesStatusEnum.IN_STOCK } 
    })
    const outOfStockStatus = await clothesStatusRepo.findOne({ 
      where: { name: ClothesStatusEnum.OUT_OF_STOCK } 
    })

    const inStockCount = await clothesRepo.findAndCount({ 
      where: { status: inStockStatus },
      relations: ['status'] 
    })
    const outOfStockCount = await clothesRepo.findAndCount({ 
      where: { status: outOfStockStatus }, 
      relations: ['status']
    })

    console.log(inStockCount)
    console.log(outOfStockCount)

    return [
      {
        status: ClothesStatusEnum.IN_STOCK,
        quantity: inStockCount[1]
      },
      {
        status: ClothesStatusEnum.OUT_OF_STOCK,
        quantity: outOfStockCount[1]
      }
    ]
  }

  async getHowManyShoppingCartWhereCreatedInCurrentMonth(): Promise<number> {
    return 5;
  }

  async getQuantityOfClientActivatedAndDeactivated(): Promise<ClientAvailability[]> {
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

    const clothes_availability_quantity = await this.getQuantityInStockAndOutOfStockClothes()
    const number_of_shopping_carts_created_current_month = await this.getHowManyShoppingCartWhereCreatedInCurrentMonth()
    const customer_rank = await this.getThreeCustomerWhoBuyTheMostInCurrentMonth()
    const shopping_cart_rank = await this.getShoppingCartRanking()
    const client_availability_quantity = await this.getQuantityOfClientActivatedAndDeactivated()

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
