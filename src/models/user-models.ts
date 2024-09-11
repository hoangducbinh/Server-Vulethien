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
        enum: ['admin', 'nhân viên kho', 'nhân viên giao hàng'],
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
    }
})


const UserModel = mongoose.model("User", userSchema);


export default UserModel;