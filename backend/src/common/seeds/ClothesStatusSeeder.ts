import { ISeeder } from './ISeeder'

import { objectFactory } from './objectFactory'
import { ClothesStatus } from './../../modules/clothes_status/ClothesStatus'
import { getRepository } from 'typeorm'

export class ClothesStatusSeeder implements ISeeder<ClothesStatus> {
  objectList: ClothesStatus[]

  constructor() {
    const parsedObjects = objectFactory<ClothesStatus>(this.data(), ClothesStatus)
    this.objectList = [...parsedObjects]
  }

  data(): Omit<ClothesStatus, 'id'>[] {
    return [
      {
        name: 'OUT OF STOCK',
      },
      {
        name: 'IN STOCK',
      },
    ]
  }

  run() {
    console.log(`Running seeder ${this.constructor.name}`)
    const repository = getRepository(ClothesStatus)
    this.objectList.forEach(async (o) => {
      const found = await repository.findOne({ where: { name: o.name } })
      if (!found) {
        await repository.save(o)
        console.log(`Saved model <ClothesStatus data=${JSON.stringify(o)}>`)
      }
    })
    console.log(`Ran succesfully the Seeder ${this.constructor.name}`)
  }
}
