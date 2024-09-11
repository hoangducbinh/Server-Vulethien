import mongoose, { Schema } from "mongoose";

const returnSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    return_date: {
        type: Date,
        default: Date.now
    },
    items: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        reason: {
            type: String,
            required: false
        }
    }],
    status: {
        type: String,
        enum: ['Đã xử lý', 'Chưa xử lý', 'Đã hoàn tất'],
        default: 'Chưa xử lý'
    },
    refund_amount: {
        type: Number,
        required: true
    },
    refund_date: {
        type: Date,
        required: false
    }
});


const ReturnModel = mongoose.model('Return', returnSchema);

export default ReturnModel