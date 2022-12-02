import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number_phone:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    role:{
        type:Number
    }
},{ timestamps: true,})

export default mongoose.model('Account',accountSchema)