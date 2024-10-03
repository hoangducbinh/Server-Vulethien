import mongoose, { Schema } from "mongoose";


const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})


const CustomerModel = mongoose.model('Customer', customerSchema)

export default CustomerModel