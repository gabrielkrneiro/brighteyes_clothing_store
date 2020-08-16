import { getRepository } from 'typeorm'

import { EmployeeTitle } from '../../modules/employee_title/EmployeeTitle'
import { objectFactory } from './objectFactory'
import { ISeeder } from './ISeeder'

export class EmployeeTitleSeeder implements ISeeder<EmployeeTitle> {
  objectList: EmployeeTitle[]

  constructor() {
    const parsedObjects = objectFactory<EmployeeTitle>(this.data(), EmployeeTitle)
    this.objectList = [...parsedObjects]
  }

  data(): Omit<EmployeeTitle, 'id'>[] {
    return [
      {
        name: 'Warehouse',
      },
      {
        name: 'Human Resource',
      },
      {
        name: 'Customer Service',
      },
      {
        name: 'Seller',
      },
      {
        name: 'Cashier',
      },
    ]
  }

  async run() {
    console.log(`Running seeder ${this.constructor.name}`)
    const repository = getRepository(EmployeeTitle)
    this.objectList.forEach(async (o) => {
      const found = await repository.findOne({ where: { name: o.name } })
      if (!found) {
        await repository.save(o)
        console.log(`Saved model <EmployeeTitle data=${JSON.stringify(o)}>`)
      }
    })
    console.log(`Ran succesfully the Seeder ${this.constructor.name}`)
  }
}
