import { ISeeder } from './ISeeder'

import { objectFactory } from './objectFactory'
import { getRepository } from 'typeorm'
import { EmployeeClientStatus } from '@src/modules/employee_client_status/EmployeeClientStatus'
import { Employee } from '@src/modules/employee/Employee'
import { EmployeeTitle } from '@src/modules/employee_title/EmployeeTitle'

export class EmployeeSeeder implements ISeeder<Employee> {
  objectList: Employee[]

  async createHrEmployee() {
    const employeeTitleRepository = getRepository(EmployeeTitle)
    const statusRepository = getRepository(EmployeeClientStatus)
    const employeeRepository = getRepository(Employee)
    const humanResourceTitle = await employeeTitleRepository.findOne({
      where: { name: 'Human Resource' },
    })
    const activatedStatus = await statusRepository.findOne({ where: { name: 'ACTIVATED' } })

    if (!humanResourceTitle || !activatedStatus) {
      throw new Error('Required data not found in database to the function "hrEmployee()"')
    }

    const hrEmployee: Omit<Employee, 'id' | 'registeredBy'> = {
      name: 'Employee 1',
      birthdate: new Date('10/14/1987'),
      photo:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      password: 'senha123',
      title: humanResourceTitle,
      status: activatedStatus,
    }

    try {
      const found = await employeeRepository.findOne({ where: { name: 'Employee 1' } })
      if (!found) {
        await employeeRepository.save(hrEmployee)
      }
      console.log('HR employee firstly created successfully')
      return hrEmployee
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }

  data(): Omit<Employee, 'id' | 'status' | 'registeredBy' | 'title'>[] {
    return [
      {
        name: 'Employee 2',
        birthdate: new Date('10/14/1987'),
        photo:
          'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        password: 'senha123',
      },
      {
        name: 'Employee 3',
        birthdate: new Date('10/14/1987'),
        photo:
          'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        password: 'senha123',
      },
      {
        name: 'Employee 4',
        birthdate: new Date('10/14/1987'),
        photo:
          'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        password: 'senha123',
      },
      {
        name: 'Employee 5',
        birthdate: new Date('10/14/1987'),
        photo:
          'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        password: 'senha123',
      },
    ]
  }

  async run() {
    await this.createHrEmployee()

    const statusRepository = getRepository(EmployeeClientStatus)
    const employeeTitleRepository = getRepository(EmployeeTitle)
    const employeeRepository = getRepository(Employee)

    const activatedStatus = await statusRepository.findOne({ where: { name: 'ACTIVATED' } })
    const deactivatedStatus = await statusRepository.findOne({ where: { name: 'DEACTIVATED' } })

    const warehouseTitle = await employeeTitleRepository.findOne({ where: { name: 'Warehouse' } })
    const customerServiceTitle = await employeeTitleRepository.findOne({
      where: { name: 'Customer Service' },
    })
    const sellerTitle = await employeeTitleRepository.findOne({ where: { name: 'Seller' } })
    const cashierTitle = await employeeTitleRepository.findOne({ where: { name: 'Cashier' } })

    const hrEmployee = await employeeRepository.findOne({
      where: { name: 'Employee 1' },
    })

    if (
      !activatedStatus ||
      !deactivatedStatus ||
      !warehouseTitle ||
      !customerServiceTitle ||
      !sellerTitle ||
      !cashierTitle ||
      !hrEmployee
    ) {
      throw new Error('Required data not found in database')
    }

    const data = this.data()
    const d1 = Object.assign(data[0], {
      ...data[0],
      registeredBy: hrEmployee,
      title: warehouseTitle,
      status: activatedStatus,
    })
    const d2 = Object.assign(data[1], {
      ...data[1],
      registeredBy: hrEmployee,
      title: customerServiceTitle,
      status: activatedStatus,
    })
    const d3 = Object.assign(data[2], {
      ...data[2],
      registeredBy: hrEmployee,
      title: sellerTitle,
      status: activatedStatus,
    })
    const d4 = Object.assign(data[3], {
      ...data[3],
      registeredBy: hrEmployee,
      title: cashierTitle,
      status: activatedStatus,
    })

    const listOfData = [d1, d2, d3, d4]

    const parsedObjects = objectFactory<Employee>(listOfData, Employee)
    this.objectList = [...parsedObjects]

    console.log(`Running seeder ${this.constructor.name}`)

    this.objectList.forEach(async (o) => {
      const found = await employeeRepository.findOne({ where: { name: o.name } })
      if (!found) {
        await employeeRepository.save(o)
        console.log(`Saved model <Employee data=${JSON.stringify(o)}>`)
      }
    })
    console.log(`Ran succesfully the Seeder ${this.constructor.name}`)
  }
}
