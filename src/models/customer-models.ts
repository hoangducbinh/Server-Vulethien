import mongoose, { Schema } from "mongoose";


const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }

})


const CustomerModel = mongoose.model('Customer', customerSchema)

export default CustomerModel