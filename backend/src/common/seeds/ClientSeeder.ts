import { ISeeder } from './ISeeder'

import { objectFactory } from './objectFactory'
import { getRepository } from 'typeorm'
import { Client } from '@src/modules/client/Client'
import { EmployeeClientStatus } from '@src/modules/employee_client_status/EmployeeClientStatus'

export class ClientSeeder implements ISeeder<Client> {
  objectList: Client[]

  data(): Omit<Client, 'id' | 'status'>[] {
    return [
      {
        name: 'Client 1',
        address: 'Rua asdf, 123 - AEdasdfsd, asdfasdf',
        birthdate: new Date('10/14/1987'),
        cpf: '123.123.123-123',
        photo:
          'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      },
    ]
  }

  async run() {
    const statusRepository = getRepository(EmployeeClientStatus)

    const status = await statusRepository.findOne({ where: { name: 'ACTIVATED' } })
    if (!status) {
      throw new Error('Status ACTIVATED not found in database')
    }
    const data = this.data().map((d) => ({ ...d, status: status }))

    const parsedObjects = objectFactory<Client>(data, Client)
    this.objectList = [...parsedObjects]

    console.log(`Running seeder ${this.constructor.name}`)
    const repository = getRepository(Client)
    this.objectList.forEach(async (o) => {
      const found = await repository.findOne({ where: { name: o.name } })
      if (!found) {
        await repository.save(o)
        console.log(`Saved model <Client data=${JSON.stringify(o)}>`)
      }
    })
    console.log(`Ran succesfully the Seeder ${this.constructor.name}`)
  }
}
