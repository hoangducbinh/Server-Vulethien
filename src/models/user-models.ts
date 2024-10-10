import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: false,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    cccd: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    hometown: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    }
})


const UserModel = mongoose.model("User", userSchema);


export default UserModel;