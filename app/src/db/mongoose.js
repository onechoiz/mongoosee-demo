const mongoose = require("mongoose");
const validator = require("validator");



mongoose.connect("mongodb://localhost:27017/my-project-api");


// // function constructer
// const user = new User({
//   name: "Lily",
// //   age: 21,
//   email: "kk@mail.it",
//   password: "jshsjhajhdsjahjshdsa",
// });

// user
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

const Task = mongoose.model("Task", {
  title: {type: String,
  required: true },
  description: { type: String,
  trim: true, required: true  },
  isCompleted: { type: Boolean , default: false},
});

const task = new Task({
    title: "Doctors Appointment",
    description: "Go to the doctor for check up.                         ",
   
})

task.save().then(res => console.log(res)).catch(err=> console.log(err))
