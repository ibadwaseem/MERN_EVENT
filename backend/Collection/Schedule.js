let mongo = require("mongoose");

let schedule_coll=mongo.Schema({
    speaker:{
        type:String,
        required:true
    },
    topic:{
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
    },
    hall:{
        refrences:{model:"Halls"},
        type:String
    }
})

module.exports=mongo.model("Expo_Schedule",schedule_coll);