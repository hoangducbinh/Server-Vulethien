import mongoose, { mongo, Schema } from "mongoose";


const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    category_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    unit_price:{
        type: Number,
        required: true
    },
    import_price:{
        type: Number,
        required: true
    },
    quantity_in_stock:{
        type: Number,
        required: true
    },
    reorder_level:{
        type: Number,
        required: false
    },
    unit:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    }
})


const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel