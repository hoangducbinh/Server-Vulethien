import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    amount :{
        type: Number,
        required: true
    },
    method:{
        type: String,
        enum: ['Tiền mặt','Chuyển khoản'],
        required: true
    },
    status:{
        type: String,
        enum: ['Đã thanh toán đủ', 'Còn nợ', 'Đã hoàn tiền']
    },
    date:{
        type: Date,
        default: Date.now
    },
    stock_entry_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockEntry'
    },
    stock_exit_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockExit'
    },
    return_id: {
        type: Schema.Types.ObjectId,
        ref: 'Return',
        required: false
    }
})

const PaymentModel = mongoose.model('Payment', paymentSchema)

export default PaymentModel