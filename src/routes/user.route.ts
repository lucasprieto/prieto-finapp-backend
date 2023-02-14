import { Router } from 'express'
import { Routes } from '@/interfaces/routes.interface'
import UserController from '@/controllers/user.controller'
import validationMiddleware from '@/middlewares/validation.middleware'
import { CreateUserDto } from '@/dtos/user.dto'

class UserRoute implements Routes {
  public path = '/user'
  public router = Router()
  public ctrl = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    const { path, ctrl } = this
    this.router.get(path, ctrl.getAll)
    this.router.get(`${path}/:id`, ctrl.getById)
    this.router.post(path, validationMiddleware(CreateUserDto, 'body'), ctrl.create)
  }
}

export default UserRoute
