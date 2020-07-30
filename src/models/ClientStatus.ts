import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClientStatus {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
