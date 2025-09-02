let mongoose=require("mongoose")

require("dotenv").config()

let db_url=process.env.URL;

let db=async function main(){
   await mongoose.connect(db_url).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((e)=>{
        console.log(e)
    })
}
module.exports=db;