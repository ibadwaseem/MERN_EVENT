let mongo = require("mongoose");

let event_coll=mongo.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    theme:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    }
})

module.exports=mongo.model("Expo_Events",event_coll);