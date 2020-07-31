import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ClientStatus } from '@models/ClientStatus'

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
  birthdate: string

  @ManyToOne(() => ClientStatus, (clientStatus) => clientStatus.id)
  clientStatus: number

  @Column()
  photo: string
}
