import { getRepository } from 'typeorm'
import { EmployeeTitle } from '../employee_title/EmployeeTitle'
import { Employee } from './Employee'
import { EmployeeCreateDTO } from './EmployeeDTO'
import bcrypt from 'bcrypt'

export class EmployeeFactory {
  buildWithCreateDTO = async (data: EmployeeCreateDTO) => {
    const employeeRepository = getRepository(Employee)
    const employeeTitle = getRepository(EmployeeTitle)
    const amountOfSaltRounds = 10

    const employee = new Employee()
    employee.name = data.name
    employee.email = data.email
    employee.password = await bcrypt.hash(data.password, amountOfSaltRounds)
    employee.photo = data.photo
    employee.birthdate = new Date(data.birthdate)
    employee.registeredBy = await employeeRepository.findOneOrFail(data.registeredBy)
    employee.title = await employeeTitle.findOneOrFail({ where: { name: data.title } })
    return employee
  }
}
