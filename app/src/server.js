const express = require("express");
const PORT = process.env.MY_PORT || 3044;
const User = require("./models/user-model");
const mongoose = require("mongoose");
const Task = require("../src/models/task-model.js");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/my-project-api");

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log(user);
    await user.save();
    res.status(201).send(user);
   
  } catch (err) {
    console.log(err);
  }
});

app.post("/task", async (req, res) => {
  // const task = new Task({
  //     title: "Doctors Appointment",
  //     description: "Go to the doctor for check up.                         ",

  // })

  try {
    const task = new Task(req.body);
    const newTask =  await task.save()
    if(!newTask){
      return res.status(400).send({msg: " something went wrong, try again"})
    }
    res.send(newTask)

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get("/users", async (req, res) => {
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
app.get("/users/:id", async (req, res) => {
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

app.get("/tasks", async (req, res) => {
  try{
    const tasks =  await Task.find({})
    if(!tasks){
      return res.status(404).send({msg: "not found"})
    }
    res.send(tasks)
  }
  catch(err){
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }

});

app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const foundTask = await Task.findById(taskId);
    if (!foundTask) {
      return res.status(404).send({ msg: "not found" });
    }
    res.send(foundTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "server error" });
  }
});

app.patch("/users/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log("running on port :", PORT);
});
