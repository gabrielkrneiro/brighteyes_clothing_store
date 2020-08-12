import jwt from 'jsonwebtoken'
import { Request, Response, Router } from 'express'
import { getRepository, Repository } from 'typeorm'

import { DTOController } from './../../common/dto/DTOController'
import { IController } from './../../interfaces/IControllers'
import { AbstractController } from '../abstract.controller'
import { Employee } from '../employee/Employee'
import { Auth } from './Auth'

interface IAuthController {
  signIn(request: Request, response: Response): Promise<Response>
  verify(request: Request, response: Response): Promise<Response>
}

export class AuthController extends AbstractController implements IController, IAuthController {
  route: Router
  employeeRepository: Repository<Employee>
  PRIVATE_KEY: string

  constructor({ route }: DTOController) {
    super()
    this.route = route
    this.ModelClassName = Auth
    this.employeeRepository = getRepository(Employee)
    this.PRIVATE_KEY = JSON.stringify(process.env.JWT_SECRET_KEY)
  }

  async init(): Promise<void> {
    this.route.get('/auth', this.summarize)
    this.route.post('/auth/sign-in', this.signIn)
    this.route.get('/auth/verify', this.verify)
  }

  summarize = async (request: Request, response: Response): Promise<Response> => {
    return response.json({
      'sign-in': `[POST] http://${process.env.HOST_ADDRESS}:${process.env.PORT}/auth/sign-in`,
      verify: `[GET] http://${process.env.HOST_ADDRESS}:${process.env.PORT}/auth/verify`,
    })
  }

  signIn = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { email, password } = request.body
      const foundEmployee = await this.employeeRepository.findOneOrFail({ where: { email } })
      if (foundEmployee.password !== password) {
        throw new Error('Password is invalid')
      }
      const accessToken = jwt.sign({ username: foundEmployee.name, email }, this.PRIVATE_KEY)
      return response.json({ access_token: accessToken })
    } catch (error) {
      console.error(error.message)
      return response.status(401).json({ message: error.message })
    }
  }

  verify = async (request: Request, response: Response): Promise<Response> => {
    try {
      const accessToken = request.headers.authorization
      if (!accessToken) {
        return response.status(401).json({ message: 'Access token not provided' })
      }
      jwt.verify(accessToken, this.PRIVATE_KEY)
      return response.json({ message: 'The access is still valid' })
    } catch (error) {
      console.error(error.message)
      return response.status(401).json({ message: error.message })
    }
  }
}
