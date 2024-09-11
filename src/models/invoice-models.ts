import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema({
    invoice_number: {
        type: String,
        required: true,
        unique: true
    },
    stock_entry_id: {
        type: Schema.Types.ObjectId,
        ref: 'StockEntry'
    },
    stock_exit_id: {
        type: Schema.Types.ObjectId,
        ref: 'StockExit'
    },
    date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    }
})

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

export default InvoiceModel