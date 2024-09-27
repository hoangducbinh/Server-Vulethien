import mongoose, { Schema } from "mongoose";


const stockEntryDetailSchema = new Schema({
    stock_entry_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockEntry',
        required: true
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity_received:{
        type: Number,
        required: true
    },
    quantity_ordered:{
        type: Number,
        required: false
    },
    import_price:{
        type: Number,
        required: false
    }
})

const StockEntryDetailModel = mongoose.model('StockEntryDetail' ,stockEntryDetailSchema)

export default StockEntryDetailModel