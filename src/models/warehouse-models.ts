import mongoose, { Schema } from "mongoose";


const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
})

const WarehouseModel = mongoose.model('Warehouse', warehouseSchema)

export default WarehouseModel