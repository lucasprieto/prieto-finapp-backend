import { Router } from 'express'
import { Routes } from '@/interfaces/routes.interface'
import ExpenseController from '@/controllers/expense.controller'
import validationMiddleware from '@/middlewares/validation.middleware'
import { CreateExpenseDto, QueryExpenseDto } from '@/dtos/expense.dto'

class ExpenseRoute implements Routes {
  public path = '/expense'
  public router = Router()
  public ctrl = new ExpenseController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    const { path, ctrl } = this
    this.router.get(path, validationMiddleware(QueryExpenseDto, 'query'), ctrl.getAll)
    this.router.get(`/categories`, ctrl.getAllCategories)
    this.router.get(`${path}/:id`, ctrl.getById)
    this.router.post(path, validationMiddleware(CreateExpenseDto, 'body'), ctrl.create)
    this.router.put(`${path}/:id`, validationMiddleware(CreateExpenseDto, 'body'), ctrl.update)
    this.router.delete(`${path}/:id`, ctrl.delete)
  }
}

export default ExpenseRoute
