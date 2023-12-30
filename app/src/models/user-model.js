const mongoose =  require("mongoose")
const validator = require("validator");

const User = mongoose.model("User", {
password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(val){
        if (val.length < 6) {
            throw new Error('Password should be at least 6 characters');
        }else if(val.toLowerCase().includes("password")){
            throw new Error ('The word "password" is not allowed in the password field')
        }
     }
  },
  name: { type: String },
  age: {
    type: Number,
    default: 0,
    validate(val) {
      if (this.age < 0) throw new Error("Age must be positive number");
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email Address");
      }
    },
  },
 
});

module.exports = User