import mongoose from 'mongoose'

export class Connect {
  load (): void {
    mongoose.connect(process.env.DB_URI ?? '')
      .then((response) => {
        console.log('Database connected.')
      })
      .catch((error) => {
        console.log('Erro to connect DB.', error)
      })
    mongoose.Promise = global.Promise
  }
}
