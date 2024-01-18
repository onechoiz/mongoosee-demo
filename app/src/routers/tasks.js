const express = require("express");
const router  = new express.Router()
const Task = require("../models/task-model")


router.post("/task", async (req, res) => {
  // const task = new Task({
  //     title: "Doctors routerointment",
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



router.get("/tasks", async (req, res) => {
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


router.get("/tasks/:id", async (req, res) => {
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



router.delete("/tasks/:id", async (req, res)=>{
    try {
      const task  = await Task.findByIdAndDelete(req.params.id)
      if(!task){
        return res.status(404).json({message:"No such task exists"})
      }
      res.send(task)
    } catch (error) {
      console.log(error);
      res.status(500).send({msg: "server error"})
      
    }
})

module.exports = router
