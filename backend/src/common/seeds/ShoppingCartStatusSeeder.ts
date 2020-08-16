import { getRepository } from 'typeorm'

import { ISeeder } from './ISeeder'
import { objectFactory } from './objectFactory'
import { ShoppingCartStatus } from './../../modules/shopping_cart_status/ShoppingCartStatus'

export class ShoppingCartStatusSeeder implements ISeeder<ShoppingCartStatus> {
  objectList: ShoppingCartStatus[]

  constructor() {
    const parsedObjects = objectFactory<ShoppingCartStatus>(this.data(), ShoppingCartStatus)
    this.objectList = [...parsedObjects]
  }

  data(): Omit<ShoppingCartStatus, 'id'>[] {
    return [
      {
        name: 'IN PROGRESS',
      },
      {
        name: 'CANCELED',
      },
      {
        name: 'FINISHED',
      },
    ]
  }

  async run() {
    console.log(`Running seeder ${this.constructor.name}`)
    const repository = getRepository(ShoppingCartStatus)
    this.objectList.forEach(async (o) => {
      const found = await repository.findOne({ where: { name: o.name } })
      if (!found) {
        await repository.save(o)
        console.log(`Saved model <ShoppingCartStatus data=${JSON.stringify(o)}>`)
      }
    })
    console.log(`Ran succesfully the Seeder ${this.constructor.name}`)
  }
}
