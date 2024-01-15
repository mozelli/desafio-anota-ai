import { type Request, type Response } from 'express'
import Category, { type ICategory } from '../models/MCategory'
import ErrorHandling from '../errors/errorHandling'
import { type Error } from 'mongoose'

export default class CCategory {
  insert (request: Request, response: Response): void {
    const { title, ownerId, description } = request.body

    Category.create({
      title, ownerId, description
    })
      .then((category) => {
        return response.status(201).json(category)
      })
      .catch((error: Error) => {
        const formatedError = new ErrorHandling(error)
        return response.status(500).json(formatedError)
      })
  }

  read (request: Request, response: Response): void {
    const id: string = request.params.id

    if (id !== null && id !== undefined) {
      Category.findById(request.params.id)
        .then((category) => {
          if (category == null) {
            return response.status(204).json(category)
          }
          return response.status(200).json(category)
        })
        .catch((error: Error) => {
          const formatedError = new ErrorHandling(error)
          return response.status(500).json(formatedError)
        })
    } else {
      Category.find()
        .then((category) => {
          return response.status(200).json(category)
        })
        .catch((error: Error) => {
          const formatedError = new ErrorHandling(error)
          return response.status(500).json(formatedError)
        })
    }
  }

  update (request: Request, response: Response): void {
    const requestData: ICategory = request.body
    Category.findByIdAndUpdate(request.params.id, requestData)
      .then((category) => {
        return response.status(200).json(category)
      })
      .catch((error: Error) => {
        const formatedError = new ErrorHandling(error)
        return response.status(500).json(formatedError)
      })
  }

  delete (request: Request, response: Response): void {
    const { id } = request.params
    Category.findByIdAndDelete(id)
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
