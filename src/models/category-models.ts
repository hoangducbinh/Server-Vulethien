import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel