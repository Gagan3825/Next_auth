import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    email:{
        type:"String",
        required:true,
        unique:true,
    },
    password:{
        type:"String",
        required:false,
        
    },
    name:{
        type:"String",
        required:true,
        
    },
    googleId:{
        type:"String",
    }
});

export default mongoose.models.User || mongoose.model('User',Userschema);