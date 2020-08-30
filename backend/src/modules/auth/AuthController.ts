import jwt from 'jsonwebtoken'
import { Request, Response, Router } from 'express'
import { getRepository, Repository } from 'typeorm'

import { DTOController } from './../../common/dto/DTOController'
import { IController } from './../../interfaces/IControllers'
import { AbstractController } from '../abstract.controller'
import { Employee } from '../employee/Employee'
import { Auth } from './Auth'
import APP_CONFIG from 'config/app.config'
import logger from '@src/common/logger/logger'

interface IAuthController {
  signIn(request: Request, response: Response): Promise<Response>
  signOut(request: Request, response: Response): Promise<Response>
  verify(request: Request, response: Response): Promise<Response>
}

interface TokenData {
  token: string
  expiresIn: number
}

interface DataStoredInToken {
  username: string
  email: string
  isValid: boolean
  title: string
}
export class AuthController extends AbstractController implements IController, IAuthController {
  route: Router
  employeeRepository: Repository<Employee>

  constructor({ route }: DTOController) {
    super()
    this.route = route
    this.ModelClassName = Auth
    this.employeeRepository = getRepository(Employee)
  }

  async init(): Promise<void> {
    this.route.get('/auth', this.summarize)
    this.route.post('/auth/sign-in', this.signIn)
    this.route.get('/auth/sign-out', this.signOut)
    this.route.get('/auth/verify', this.verify)
  }

  summarize = async (request: Request, response: Response): Promise<Response> => {
    return response.json({
      'sign-in': `[POST] http://${process.env.HOST_ADDRESS}:${process.env.PORT}/auth/sign-in`,
      'sign-out': `[POST] http://${process.env.HOST_ADDRESS}:${process.env.PORT}/auth/sign-out`,
      verify: `[GET] http://${process.env.HOST_ADDRESS}:${process.env.PORT}/auth/verify`
    })
  }

  signIn = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { email, password } = request.body
      logger.debug('Sign in email ' + email)
      const foundEmployee = await this.employeeRepository.findOneOrFail({ where: { email } })
      if (foundEmployee.password !== password) {
        throw new Error('Password is invalid to email ' + email)
      }
      logger.debug(`Successfully signed ${email} in`)
      const accessToken = this.createToken(foundEmployee)
      response.setHeader('Set-Cookie', [this.createCookie(accessToken)])
      return response.json(accessToken)
    } catch (error) {
      logger.error(error.message)
      return response.status(401).json({ message: error.message })
    }
  }

  verify = async (request: Request, response: Response): Promise<Response> => {
    try {
      const accessToken = request.headers.authorization
      logger.debug(`Verifing access token= ${accessToken}`)
      if (!accessToken) {
        throw new Error('Access token not provided')
      }
      const decodedToken = this.decodeToken(accessToken)
      this.checkIfTokenIsValid(decodedToken)

      return response.json({ message: 'The access is still valid' })
    } catch (error) {
      logger.error(error.message)
      return response.status(401).json({ message: error.message })
    }
  }

  signOut = async (request: Request, response: Response): Promise<Response> => {
    try {
      const accessToken = this.getFromHeaders(request, 'authorization')
      const decodedToken = this.decodeToken(accessToken as string)
      this.checkIfTokenIsValid(decodedToken)
      decodedToken.isValid = false
      decodedToken.email = ''
      decodedToken.username = ''
      return response.json({ message: 'User logged out successfully' })
    } catch (error) {
      logger.error(error.message)
      return response.status(401).json({ message: error.message })
    }
  }

  private createToken(employee: Employee): TokenData {
    const expiresIn = 60 * 60 // an hour
    const dataStokenInToken: DataStoredInToken = {
      username: employee.name,
      email: employee.email,
      isValid: true,
      title: employee.title.name
    }
    return {
      expiresIn,
      token: jwt.sign(dataStokenInToken, APP_CONFIG.jwtSecretkey, { expiresIn })
    }
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private checkIfTokenIsValid(decodedToken: DataStoredInToken) {
    if (!decodedToken.isValid) throw new Error('Token is invalid')
    logger.debug('Token is valid')
    return decodedToken.isValid
  }

  private decodeToken(accessToken: string) {
    return jwt.verify(accessToken, APP_CONFIG.jwtSecretkey) as DataStoredInToken
  }

  private getFromHeaders(request: Request, param: string): string | string[] {
    const requestedParam = request.headers[param]
    if (!requestedParam) throw new Error('Parameter ' + requestedParam + ' not provided')
    return requestedParam
  }
}
