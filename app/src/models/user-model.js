const mongoose =  require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema(
  {
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
      if (val < 0) throw new Error("Age must be positive number");
    },
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email Address");
      }
    },
  },
 
}

)



userSchema.pre("save", async function(next){
    const user = this

    if(user.isModified("password")){
      user.password = await bcrypt.hash(user.password, 8)
    }

    next();

})


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error("User not found ");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login password error");
  }
  return user;
};

const User = mongoose.model("User",  userSchema);


module.exports = User