import type { Router } from 'express'
import CCategory from './controllers/CCategory'

export default class Routes {
  public router: Router
  private readonly categoryController: CCategory

  constructor (app: Router) {
    this.router = app
    this.categoryController = new CCategory()
  }

  private load (): void {
    this.router.get('/api/category', this.categoryController.read)
  }
}
