import { Router } from 'express'

import { ClientStatusController } from './controllers/ClientStatusController'
import { ClientController } from './controllers/ClientController'

const route = Router()

const clientController = new ClientController()

route.get('/clients', clientController.list)
route.post('/clients', clientController.create)
route.get('/clients/:id', clientController.listOne)
route.put('/clients/:id', clientController.update)
route.delete('/clients/:id', clientController.remove)

const clientStatusController = new ClientStatusController()

route.get('/clients-status', clientStatusController.list)
route.post('/clients-status', clientStatusController.create)
route.get('/clients-status/:id', clientStatusController.listOne)
route.put('/clients-status/:id', clientStatusController.update)
route.delete('/clients-status/:id', clientStatusController.remove)

export default route
