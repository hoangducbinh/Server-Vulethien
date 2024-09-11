import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    date_ordered: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Đang xử lý', 'Đã giao', 'Đã hủy'],
        required: true
    },
    total_value: {
        type: Number,
        required: true
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }
})

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel