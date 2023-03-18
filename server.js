const dotenv = require("dotenv")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require("mongoose");
const path = require("path");
dotenv.config();
const database = process.env.DATABASE




//INITIALIZATIONS
const app = express();
app.use(cors());
app.use(bodyParser.json());

//SETTING MONGOOSE

mongoose.connect(database);

const USER_SCHEMA = mongoose.Schema({
    fname  : String,
    lname : String,
})

const Usercollection = mongoose.model("user",USER_SCHEMA);



//SERVERS REQUESTS
app.get("/",(req,res)=>{
  
async function findData()
{
  try{ const respond =  await Usercollection.find({})
   console.log(respond);
   res.json(JSON.stringify(respond));
}
catch(error){
    console.log(error);
}
}
findData();

})

app.post("/send",(req,res)=>{

    const Fname  = req.body.fname ; 
    const Lname =  req.body.lname ;

    console.log

    const user = new Usercollection({
        fname : Fname,
        lname : Lname,
    })

    user.save();
    
    res.json("request submitted");
   
})



//LISTENING
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})
