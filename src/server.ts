import { App, IApp } from "@src/app"

(async function () {
    const app: IApp = new App()
    await app.init()
    app.start()
})()