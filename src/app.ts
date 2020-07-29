import express from 'express'
import cors from 'cors'

export interface IApp {
  init(): Promise<void>
  middlewares(): void
  routes(): void
  start(): void
}

export class App implements IApp {
  application: express.Application;

  constructor () {
    this.application = express()
  }

  async init (): Promise<void> {
    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.application.use(express.json())
    this.application.use(cors())
  }

  routes (): void {
    this.application.get('/', (request, response) => response.json({ message: 'Hello world' }))
  }

  start (): void {
    this.application.listen(3333, () => console.log('* Server running on port 3333'))
  }
}
