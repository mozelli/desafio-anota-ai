import { type Request, type Response } from 'express'
import Product, { type IProduct } from '../models/MProduct'
import Category from '../models/MCategory'
import ErrorHandling from '../errors/errorHandling'
import { type Error } from 'mongoose'

export default class CProduct {
  insert (request: Request, response: Response): void {
    const { title, ownerId, description, price, category }: IProduct = request.body

    Category.findById(category)
      .then((categoryResponse) => {
        if (categoryResponse === null) {
          console.log(categoryResponse)
          return response.status(204).json(categoryResponse)
        } else {
          Product.create({
            title,
            ownerId,
            description,
            price,
            category: categoryResponse
          })
            .then((productResult) => {
              return response.status(201).json(productResult)
            })
            .catch((productError: Error) => {
              const formatedError = new ErrorHandling(productError)
              return response.status(500).json(formatedError)
            })
        }
      })
      .catch((errorCategory: Error) => {
        const formatedError = new ErrorHandling(errorCategory)
        return response.status(500).json(formatedError)
      })
  }

  read (request: Request, response: Response): void {
    const id: string = request.params.id

    if (id !== null && id !== undefined) {
      Product.findById(request.params.id)
        .then((product) => {
          if (product == null) {
            return response.status(204).json(product)
          }
          return response.status(200).json(product)
        })
        .catch((error: Error) => {
          const formatedError = new ErrorHandling(error)
          return response.status(500).json(formatedError)
        })
    } else {
      Product.find()
        .then((product) => {
          return response.status(200).json(product)
        })
        .catch((error: Error) => {
          const formatedError = new ErrorHandling(error)
          return response.status(500).json(formatedError)
        })
    }
  }

  update (request: Request, response: Response): void {
    const requestData: IProduct = request.body
    Product.findByIdAndUpdate(request.params.id, requestData)
      .then((product) => {
        return response.status(200).json(product)
      })
      .catch((error: Error) => {
        const formatedError = new ErrorHandling(error)
        return response.status(500).json(formatedError)
      })
  }

  delete (request: Request, response: Response): void {
    const { id } = request.params
    Product.findByIdAndDelete(id)
      .then((result) => {
        if (result == null) {
          return response.status(204).json(result)
        }
        return response.status(200).json(result)
      })
      .catch((error: Error) => {
        const formatedError = new ErrorHandling(error)
        return response.status(500).json(formatedError)
      })
  }
}
