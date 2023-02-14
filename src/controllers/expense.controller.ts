import { CreateExpenseDto, QueryExpenseDto } from '@/dtos/expense.dto'
import { Expense } from '@/interfaces/expense.interface'
import ExpenseService from '@/services/expense.service'
import { NextFunction, Request, Response } from 'express'

class ExpenseController {
  private service = new ExpenseService()

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: QueryExpenseDto = req.query
      const data: Expense[] = await this.service.query(dto)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  public getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: string[] = await this.service.findAllCategories()
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id
      const data: Expense = await this.service.findById(id)

      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateExpenseDto = req.body
      const data: Expense = await this.service.create(dto)
      res.status(201).json({ data, message: 'created' })
    } catch (error) {
      next(error)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateExpenseDto = req.body
      const id: string = req.params.id
      const data: Expense = await this.service.update(id, dto)
      res.status(200).json({ data, message: 'updated' })
    } catch (error) {
      next(error)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id
      const data: Expense = await this.service.archive(id)
      res.status(200).json({ data, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}

export default ExpenseController
