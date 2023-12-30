const express = require('express')
const PORT =  process.env.MY_PORT || 3043
const User = require("./models/user-model")

const app = express()


// app.get("", )

app.post("/users", (req, res)=>{
  
   const user = new User( req.body
   )
   user.save().then(res=> res.status(200).send(user)).catch(err => console.log(err))

    
})

app.listen(PORT,()=>{
    console.log("running on port :",PORT );
})