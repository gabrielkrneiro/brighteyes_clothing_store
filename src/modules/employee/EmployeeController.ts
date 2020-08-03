// import { DTOController } from '@src/common/dto/DTOController'
// import { IController } from '@src/interfaces/IControllers'
// import { Request, Response, Router } from 'express'
// import { getRepository } from 'typeorm'

// export class ClientStatusController implements IController {
//   route: Router

//   constructor({ route }: DTOController) {
//     this.route = route
//   }

//   async init(): Promise<void> {
//     this.route.get('/client-status', this.list)
//     this.route.post('/client-status', this.create)
//     this.route.get('/client-status/:id', this.listOne)
//     this.route.put('/client-status/:id', this.update)
//     this.route.delete('/client-status/:id', this.remove)
//   }

//   async list(_: Request, response: Response): Promise<Response> {
//     try {
//       const clientStatusRepo = getRepository(ClientStatus)
//       const clientStatusList = await clientStatusRepo.find()
//       return response.json(clientStatusList)
//     } catch (error) {
//       console.error(error)
//       return response.status(401).json({
//         message: 'an error occurred',
//         error_message: error.message,
//       })
//     }
//   }

//   async listOne(request: Request, response: Response): Promise<Response> {
//     try {
//       const clientStatusId = request.params.id
//       const clientStatusRepo = getRepository(ClientStatus)
//       const foundClient = await clientStatusRepo.findOneOrFail({
//         where: {
//           id: clientStatusId,
//         },
//       })
//       return response.json(foundClient)
//     } catch (error) {
//       console.error(error)
//       return response.status(401).json({
//         message: 'an error occurred',
//         error_message: error.message,
//       })
//     }
//   }

//   async create(request: Request, response: Response): Promise<Response> {
//     try {
//       const data = request.body
//       const clientStatusRepo = getRepository(ClientStatus)
//       const createdClientStatus = await clientStatusRepo.save(data)
//       return response.json({
//         message: 'Client status created',
//         data: createdClientStatus,
//       })
//     } catch (error) {
//       console.error(error)
//       return response.status(401).json({
//         message: 'An error occurred',
//         error_message: error.message,
//       })
//     }
//   }

//   async update(request: Request, response: Response): Promise<Response> {
//     try {
//       const data = request.body
//       const clientStatusId = request.params.id
//       const clientStatusRepo = getRepository(ClientStatus)
//       await clientStatusRepo.update(clientStatusId, data)
//       const updatedClientStatus = await clientStatusRepo.findOneOrFail({
//         where: { id: clientStatusId },
//       })
//       return response.json({
//         message: 'Client status updated',
//         data: updatedClientStatus,
//       })
//     } catch (error) {
//       console.error(error)
//       return response.status(401).json({
//         message: 'An error occurred',
//         error_message: error.message,
//       })
//     }
//   }

//   async remove(request: Request, response: Response): Promise<Response> {
//     try {
//       const clientStatusId = request.params.id
//       const clientStatusRepo = getRepository(ClientStatus)
//       const foundClientStatus = await clientStatusRepo.findOneOrFail(clientStatusId)
//       await clientStatusRepo.remove(foundClientStatus)
//       return response.json({
//         message: 'Client status removed',
//       })
//     } catch (error) {
//       console.error(error)
//       return response.status(401).json(error)
//     }
//   }
// }
