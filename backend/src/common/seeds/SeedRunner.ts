import { ISeeder } from './ISeeder'

export class SeedRunner {
  seeders: ISeeder<any>[]

  constructor() {
    this.seeders = []
  }

  addSedder(seeder: ISeeder<any>): void {
    this.seeders.push(seeder)
  }

  start() {
    try {
      this.seeders.forEach((seeder) => seeder.run())
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }
}
