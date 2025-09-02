let mongo = require("mongoose");


let hall_coll = mongo.Schema({
    hall_no: {
      type: String,
      required: true
    },
    no_of_booth: {
      type: Number,
      required: true
    },
    events: {
      type: mongo.Schema.Types.ObjectId,
      ref: "Expo_Events",  // Model name jo aap export kar rahe ho
      required: true
    }
  });
  

module.exports=mongo.model("Halls",hall_coll);