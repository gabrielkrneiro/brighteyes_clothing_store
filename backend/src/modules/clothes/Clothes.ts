import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ClothesStatus } from '../clothes_status/ClothesStatus'
import { Employee } from '../employee/Employee'

@Entity()
export class Clothes {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ClothesStatus)
  @JoinColumn({ name: 'client_status_id' })
  status: number

  @ManyToMany(() => Employee)
  @JoinTable({ name: 'clothes_employees' })
  employees: Employee[]

  @Column()
  name: string

  @Column()
  price: string

  @Column()
  photo: string

  @Column()
  cpf: string

  @Column({ default: 0, name: 'quantity_in_stock' })
  quantityInStock: number
}
