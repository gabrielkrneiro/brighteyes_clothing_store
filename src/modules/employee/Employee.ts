import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { EmployeeClientStatus } from '@src/modules/employee_client_status/EmployeeClientStatus'
import { EmployeeTitle } from '../employee_title/EmployeeTitle'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => EmployeeTitle, (employeeTitle) => employeeTitle.id)
  @JoinColumn({ name: 'employee_title_id' })
  title: number

  @ManyToOne(() => EmployeeClientStatus, (employeeClientStatus) => employeeClientStatus.id)
  @JoinColumn({ name: 'employee_status_id' })
  status: number

  @Column()
  name: string

  @Column()
  photo: string

  @Column()
  birthdate: Date
}
