let mongo = require("mongoose");

let feedback_coll = mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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

module.exports=mongo.model("Feedback",feedback_coll);