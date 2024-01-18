const express = require("express");
const router  = new express.Router()
const User = require("../models/user-model")
const bcrypt =  require("bcrypt")



router.get("/test", (req,res)=>{

    res.send("hola")
})

// create a   users 
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log(user);
    await user.save();
    res.status(201).send(user);
   
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async (req, res) => {
  // find all the users
  try{
    const users = await User.find({})
    if(!users){
      return res.status(404).json({message :"No Users found"})
    }
    res.send(users)
  }
  catch(err){
    res.status(500).send(err);
  }
 
});



//  id is a params an dis written with :
router.get("/users/:id", async (req, res) => {
  try {
    // const _id = req.params.id;
    const foundUser = await User.findById(req.params.id)
    if(!foundUser){
      console.log("user not found");
      return res.status(404);
    }
     res.send(foundUser);
  
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }
});



router.patch("/users/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowUpdates = ["name", "age", "password"];
    const isValidOperation = updates.every((update) =>
      allowUpdates.includes(update)
    );
    if (!isValidOperation) {
      res.status(404).send({ error: "invalid update" });
    }
    console.log(updates);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowUpdates = ["title", "description", "isCompleted"];
    const isValid = updates.every((update) => allowUpdates.includes(update));
    if (!isValid) {
      return res.status(400).send("Invalid Updates!");
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        console.log(user);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(401).send({ error: "Invalid email or password" });
    }
});



router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send;
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});



module.exports = router