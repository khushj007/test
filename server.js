const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const database = process.env.DATABASE;

//INITIALIZATIONS
const app = express();
app.use(cors());
app.use(bodyParser.json());

//SETTING MONGOOSE

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    return console.log("database connected");
  })
  .catch((e) => console.log("ERRORDB", e));

const USER_SCHEMA = mongoose.Schema({
  fname: String,
  lname: String,
});

const Usercollection = mongoose.model("user", USER_SCHEMA);

//SERVERS REQUESTS

const findData = async (req, res, next) => {
  try {
    const tasks = await Usercollection.find().maxTimeMS(30000);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.send(`there has been some error : ${error}`);
  }
};

app.get("/detail", findData);

app.post("/details", (req, res) => {
  const Fname = req.body.fname;
  const Lname = req.body.lname;

  console.log;

  const user = new Usercollection({
    fname: Fname,
    lname: Lname,
  });

  user.save();

  res.json("request submitted");
});

app.get("*", (req, res) => {
  res.send("404");
});

//LISTENING
const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.log("i runned");
  return res.send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});
