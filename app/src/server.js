const express = require("express");
const PORT = process.env.MY_PORT || 3044;
const User = require("./models/user-model");
const mongoose = require("mongoose")

const app = express();
app.use(express.json());

// app.get("", )
mongoose.connect("mongodb://localhost:27017/my-project-api");

app.post("/users", (req, res) => {
  const user = new User(req.body);
  try{

  user
    .save()
    .then((result) => res.send(user))
    .catch((err) => console.log(err));
}
catch(err){
  console.log(err);
}



}
);
  


app.listen(PORT, () => {
  console.log("running on port :", PORT);
});
