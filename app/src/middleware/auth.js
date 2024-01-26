const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")


    const decode = jwt.verify(token, "kuku12");
    const user = await User.findOne({ _id: decode._id});
    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({error: "please authenticate"})
  }
};

module.exports = auth;
