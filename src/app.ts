import express from 'express'
import { Application } from "express"

export interface IApp {
    init(): Promise<void>
    middlewares(): void
    routes(): void
    start(): void
}

export class App implements IApp {

    application: Application

    constructor() {
        this.application = express()
    }

    async init(): Promise<void> {
        this.middlewares()
        this.routes()
    }

    middlewares(): void { }

    routes(): void {
        this.application.get('/', (request, response) => {
            return response.json({ message: 'Hello world' })
        })
    }

    start(): void {
        this.application.listen(3333, () => console.log('* Server running on port 3333'))
    }
}
