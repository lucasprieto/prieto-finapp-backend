import { Router } from 'express'
import IndexController from '@/controllers/index.controller'
import { Routes } from '@/interfaces/routes.interface'

class IndexRoute implements Routes {
  public path = '/'
  public router = Router()
  public ctrl = new IndexController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    const { path, ctrl } = this
    this.router.get(path, ctrl.index)
  }
}

export default IndexRoute
