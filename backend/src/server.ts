import 'reflect-metadata'
import { App } from '@src/app'
;(async function () {
  const app = new App()
  await app.init()
  app.start()
})()
