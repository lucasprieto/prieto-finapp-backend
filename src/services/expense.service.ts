import { FilterQuery } from 'mongoose'
import { addMonths } from 'date-fns'
import { CreateExpenseDto, QueryExpenseDto } from '@/dtos/expense.dto'
import { HttpException } from '@/exceptions/HttpException'
import { Expense } from '@/interfaces/expense.interface'
import ExpenseModel from '@/models/expense.model'
import { isEmpty } from '@/utils/util'

class ExpenseService {
  public model = ExpenseModel

  public async query(data: QueryExpenseDto): Promise<Expense[]> {
    const q: FilterQuery<Expense> = { archived: data.archived || false }
    if (data.year && data.month) {
      const dateFrom = new Date(data.year, data.month - 1)
      const dateTo = addMonths(new Date(data.year, data.month - 1), 1)
      q.date = { $gte: dateFrom, $lt: dateTo }
    }
    const entities: Expense[] = await this.model.find(q)
    return entities
  }

  public async findAllCategories(): Promise<string[]> {
    const entities: string[] = await this.model.distinct('category', { archived: false })
    return entities
  }

  public async findAll(): Promise<Expense[]> {
    const entities: Expense[] = await this.model.find({ archived: false })
    return entities
  }

  public async findById(id: string): Promise<Expense> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')

    const entity: Expense = await this.model.findOne({ _id: id })
    if (!entity) throw new HttpException(404, 'Expense not found')

    return entity
  }

  public async create(data: CreateExpenseDto): Promise<Expense> {
    if (isEmpty(data)) throw new HttpException(400, 'Payload is empty')

    const entity: Expense = await this.model.create(data)

    return entity
  }

  public async update(id: string, data: CreateExpenseDto): Promise<Expense> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')
    if (isEmpty(data)) throw new HttpException(400, 'Payload is empty')

    const entity: Expense = await this.model.findByIdAndUpdate(id, data, { new: true })
    if (!entity) throw new HttpException(404, 'Expense does not exist')

    return entity
  }

  public async delete(id: string): Promise<Expense> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')

    const entity: Expense = await this.model.findByIdAndDelete(id)
    if (!entity) throw new HttpException(404, 'Expense does not exist')

    return entity
  }

  public async archive(id: string): Promise<Expense> {
    if (isEmpty(id)) throw new HttpException(400, 'ID is empty')

    const entity: Expense = await this.model.findByIdAndUpdate(id, { archived: true }, { new: true })
    if (!entity) throw new HttpException(404, 'Expense does not exist')

    return entity
  }
}

export default ExpenseService
