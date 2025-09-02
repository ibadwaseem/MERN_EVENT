let express =require('express');
let r=require("./Routing/Route");
let hallroute=require("./Routing/Hall");
let db =require("./Connect");
const bodyParser = require('body-parser');
// let admin=require("./Collection/Admin");
let cors= require("cors");
require("dotenv").config();
const stallRoutes = require("./routing/Stall"); // adjust path
const stallBookingRoutes = require('./Function/StalledBook');


let port=process.env.PORT || 4000
let app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/eproject/",r);
app.use("/eproject/halls/", hallroute);
app.use('/api/stalls/', stallBookingRoutes);
app.use("/eproject/stalls/", stallRoutes);


db().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port http://localhost:${port}/eproject`);
    })
}).catch((e)=>{
    console.log(e);
})