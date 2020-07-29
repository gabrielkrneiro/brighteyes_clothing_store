import { App } from '@src/app'

async function runServer () {
  const app = new App()
  await app.init()
  app.start()
}
runServer()
