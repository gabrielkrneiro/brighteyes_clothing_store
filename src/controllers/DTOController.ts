import { Router } from 'express'
import { Connection } from 'typeorm'

export interface DTOController<T> {
  route: Router
  // repository: Repository<T>
  db: Connection
}
