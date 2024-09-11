import mongoose, { Schema } from "mongoose";


const stockExitSchema = new Schema({
    customer_id :{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    warehouse_id:{
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    total_value:{
        type: Number,
        required: true
    },
    payment: [{
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }],
    returns: [{
        type: Schema.Types.ObjectId,
        ref: 'Return'
    }]
})

const StockExitModel = mongoose.model('StockExit', stockExitSchema)

export default StockExitModel