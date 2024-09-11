import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema(
    {
        name:{
            type: String,
            required:true
        },
        contact_info:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        }

    }
)


const SupplierModel = mongoose.model('Supplier', supplierSchema)

export default SupplierModel