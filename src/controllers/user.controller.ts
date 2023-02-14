import { CreateUserDto } from '@/dtos/user.dto'
import { User } from '@/interfaces/user.interface'
import UserService from '@/services/users.service'
import { NextFunction, Request, Response } from 'express'

class UserController {
  private userService = new UserService()

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: User[] = await this.userService.findAll()
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id
      const data: User = await this.userService.findById(id)

      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateUserDto = req.body
      const data: User = await this.userService.create(dto)
      res.status(201).json({ data, message: 'created' })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
