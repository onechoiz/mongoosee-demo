const express = require("express");
const PORT = process.env.MY_PORT || 3044;
const User = require("./models/user-model");
const mongoose = require("mongoose");
const Task = require("../src/models/task-model.js");
const bcrypt = require("bcrypt")

const router = new express.Router()
const userRouter = require("./routers/user.js")
const taskRouter = require("./routers/tasks.js")

const app = express();
app.use(express.json());


app.use(taskRouter);
app.use(userRouter)



mongoose.connect("mongodb://localhost:27017/my-project-api");

// const passHash = async () =>{
//      const password = "eq22"
//      const hashedPassword = await bcrypt.hash(password, 8)
//      console.log(hashedPassword);

//      const isMatch = await bcrypt.compare("eq2sjkshdjsh", hashedPassword)
//      console.log(isMatch);
// }  

// passHash()

app.listen(PORT, () => {
  console.log("running on port :", PORT);
});
