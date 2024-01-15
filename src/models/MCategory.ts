import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ICategory {
  id: string
  title: string
  ownerId: string
  description: string
}

const category = new Schema<ICategory>({
  title: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: 'sem descrição'
  }
})

const Category = mongoose.model('Category', category)

export default Category
