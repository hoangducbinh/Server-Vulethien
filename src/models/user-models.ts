import mongoose, { model, mongo, Schema } from "mongoose";


const UserSchema = new Schema({
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
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    }
})


const UserModel = mongoose.model("User", UserSchema);


export default UserModel;