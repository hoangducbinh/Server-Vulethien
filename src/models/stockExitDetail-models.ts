import mongoose, { Schema } from "mongoose";



const stockExitDetailSchema = new Schema({
    stock_exit_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockExit',
        required: true
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity_received:{
        type: Number,
        required: true
    },
    quantity_ordered:{
        type: Number,
        required: true
    },
    
})


const StockExitDetailModel = mongoose.model('StockExitDetail', stockExitDetailSchema)

export default StockExitDetailModel