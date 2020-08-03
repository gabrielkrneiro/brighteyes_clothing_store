import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { EmployeeClientStatus } from '@src/modules/employee_client_status/EmployeeClientStatus'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'employee_title_id' })
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
