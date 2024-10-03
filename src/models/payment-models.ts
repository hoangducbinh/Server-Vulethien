import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    amount :{
        type: Number,
        required: true,
    },
    method:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    total_amount:{
        type: Number,
        required: true
    },
    last_amount:{
        type: Number,
        required: false
    },
    last_method:{
        type: String,
        required: false
    },
    stock_entry_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockEntry',
        required: false
    },
    stock_exit_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockExit',
        required: false
    },
    return_id: {
        type: Schema.Types.ObjectId,
        ref: 'Return',
        required: false
    },
})

const PaymentModel = mongoose.model('Payment', paymentSchema)

export default PaymentModel