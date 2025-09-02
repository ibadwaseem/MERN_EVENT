let mongo = require("mongoose");

let contact_coll = mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    subject: {
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongo.model("Contact",contact_coll);