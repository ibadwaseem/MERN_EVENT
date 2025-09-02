let mongo= require("mongoose");

let exhibitor_collection=mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongo.model("exhibitor",exhibitor_collection)