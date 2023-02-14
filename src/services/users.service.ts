import { hash } from 'bcrypt'
import { CreateUserDto } from '@/dtos/user.dto'
import { HttpException } from '@/exceptions/HttpException'
import { User } from '@/interfaces/user.interface'
import userModel from '@/models/user.model'
import { isEmpty } from '@/utils/util'

class UserService {
  public model = userModel

  public async findAll(): Promise<User[]> {
    const entities: User[] = await this.model.find()
    return entities
  }

  public async findById(id: string): Promise<User> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')

    const entity: User = await this.model.findOne({ _id: id })
    if (!entity) throw new HttpException(404, 'User not found')

    return entity
  }

  public async create(data: CreateUserDto): Promise<User> {
    if (isEmpty(data)) throw new HttpException(400, 'Payload is empty')

    const userExists: User = await this.model.findOne({ email: data.email })
    if (userExists) throw new HttpException(409, `${data.email} already exists`)

    const hashedPassword = await hash(data.password, 10)
    const entity: User = await this.model.create({ ...data, password: hashedPassword })

    return entity
  }

  public async update(id: string, data: CreateUserDto): Promise<User> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')
    if (isEmpty(data)) throw new HttpException(400, 'Payload is empty')

    if (data.password) {
      const hashedPassword = await hash(data.password, 10)
      data.password = hashedPassword
    }

    const entity: User = await this.model.findByIdAndUpdate(id, data)

    return entity
  }

  public async delete(id: string): Promise<User> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')

    const entity: User = await this.model.findByIdAndDelete(id)
    if (!entity) throw new HttpException(404, 'User does not exist')

    return entity
  }
}

export default UserService
