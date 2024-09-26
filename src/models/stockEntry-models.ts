import mongoose, { Schema } from "mongoose";


const stockEntrySchema = new Schema({
    supplier_id:{
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    warehouse_id:{
        type: Schema.Types.ObjectId,
        ref:'Warehouse',
        required: true
    },
    date_received: {
        type: Date,
        default: Date.now
    },
    total_value:{
        type: Number,
        required: true
    },
})

const StockEntryModel = mongoose.model('StockEntry', stockEntrySchema)

export default StockEntryModel