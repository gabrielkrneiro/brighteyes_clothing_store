import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { EmployeeClientStatus } from '@src/modules/employee_client_status/EmployeeClientStatus'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  address: string

  @Column()
  cpf: string

  @Column()
  birthdate: Date

  @ManyToOne(() => EmployeeClientStatus)
  @JoinColumn({ name: 'client_status_id' })
  status: EmployeeClientStatus

  @Column()
  photo: string
}
