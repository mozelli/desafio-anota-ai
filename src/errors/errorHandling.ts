import { type Error } from 'mongoose'

interface IError {
  error: {
    name: string
    message: string
    stack: string | undefined
  }
}

export default class ErrorHandling {
  public error: IError

  constructor (error: Error) {
    this.error = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }
  }
}
