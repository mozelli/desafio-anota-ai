import express from 'express'
import type { Express, Request, Response, Router } from 'express'
import { Connect } from './database/config/connect'
import CCategory from './controllers/CCategory'
import CProduct from './controllers/CProduct'

export default class Server {
  private readonly app: Express
  private readonly router: Router
  private readonly port: number

  constructor (port: number) {
    this.port = port
    this.app = express()
    this.app.use(express.json())
    this.router = express.Router()
    this.load()
  }

  load (): void {
    const connection = new Connect()
    connection.load()
    this.routes(this.router)
    this.listen(this.port)
  }

  private listen (port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on localhost:${port}`)
    })
  }

  private routes (router: Router): void {
    const categoryController = new CCategory()
    const productController = new CProduct()

    router.get('/', (req: Request, res: Response) => {
      return res.json({ Hello: 'world' })
    })

    router.get('/api/category/:id', categoryController.read)
    router.get('/api/category', categoryController.read)
    router.post('/api/category', categoryController.insert)
    router.put('/api/category/:id', categoryController.update)
    router.delete('/api/category/:id', categoryController.delete)

    router.get('/api/product/:id', productController.read)
    router.get('/api/product', productController.read)
    router.post('/api/product', productController.insert)
    router.put('/api/product/:id', productController.update)
    router.delete('/api/product/:id', productController.delete)

    this.app.use(this.router)
  }
}
