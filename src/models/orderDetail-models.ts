import mongoose, { Schema } from "mongoose";

const orderDetailSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const OrderDetailModel = mongoose.model('OrderDetail', orderDetailSchema);

export default OrderDetailModel