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
        required: true
    },
    total_value: {
        type: Number,
        required: true
    },
})

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel