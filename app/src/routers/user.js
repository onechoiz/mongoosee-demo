const express = require("express");
const router  = new express.Router()
const User = require("../models/user-model")
const bcrypt =  require("bcrypt")
const auth = require("../middleware/auth")


router.get("/test", (req,res)=>{

    res.send("hola")
})

// create a   users 
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log(user);
   const token = await user.generateAuthToken()
    await user.save();
    res.status(201).send({user, token});
   
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", auth, async (req, res) => {
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

router.get("/users/me", auth ,async (req,res)=>{
  res.send(req.user)
})


router.get("/users/log-out", auth, async (req,res)=>{
     try{
         req.user.tokens=[]
         await req.user.save()
         res.send("logged out")
     }catch(err){
      console.log(err);
      res.status(500).send("failed to log out")
     }
})



//  id is a params an dis written with :
// router.get("/users/:id", async (req, res) => {
//   try {
//     // const _id = req.params.id;
//     const foundUser = await User.findById(req.params.id)
//     if(!foundUser){
//       console.log("user not found");
//       return res.status(404);
//     }
//      res.send(foundUser);
  
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: "internal server error" });
//   }
// });



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
        const token =  await user.generateAuthToken()
        res.status(200).send({user, token});
    } catch (err) {
        console.log("err", err);
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