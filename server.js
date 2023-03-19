const dotenv = require("dotenv")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require("mongoose");
dotenv.config();
const database = process.env.DATABASE




//INITIALIZATIONS
const app = express();
app.use(cors());
app.use(bodyParser.json());



//SETTING MONGOOSE


mongoose.connect(database,{
    dbName : "fullstack",
}).then((res)=>{return(console.log("database connected"))}).catch((e)=>console.log("ERRORDB",e))

const USER_SCHEMA = mongoose.Schema({
    fname  : String,
    lname : String,
})

const Usercollection = mongoose.model("user",USER_SCHEMA);



//SERVERS REQUESTS
app.get("/detail",(req,res)=>{
  
async function findData()
{
    try{
   const respond =  await Usercollection.find({})
   console.log(respond);
   res.json(JSON.stringify(respond));
    }
    catch(err) {
        res.send(`there has been some err ${err}`);
    }
}
findData();

})

app.post("/details",(req,res)=>{

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

app.all("*",(req,res)=>{
        throw new Error;
    
})



//LISTENING
const PORT = process.env.PORT || 5000;


app.use((err,req,res,next)=>{
    console.log("i runned");
    return (res.send("404 NOT FOUND"));
})


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})
