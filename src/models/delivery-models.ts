import mongoose, { Schema } from "mongoose";

const deliverySchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    delivery_staff_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' represents both employees and delivery staff
        required: true
    },
    delivery_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Đang giao', 'Đã giao', 'Thất bại'],
        required: true
    },
    notes: {
        type: String
    }
})

const DeliveryModel = mongoose.model('Delivery', deliverySchema);

export default DeliveryModel