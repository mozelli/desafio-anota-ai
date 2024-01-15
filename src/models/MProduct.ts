import mongoose from 'mongoose'
import { type ICategory } from './MCategory'

const { Schema, model } = mongoose

export interface IProduct {
  id: string
  title: string
  ownerId: string
  category: ICategory
  price: number
  description: string
}

const product = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: 'sem descrição'
  }
})

const Product = model('Product', product)

export default Product
