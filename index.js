const express = require('express')
const app = express ()
const dotenv= require('dotenv').config()
const bodyParser = require('body-parser')
let UserRouter = require('./routes/UserRouter')
let axios = require('axios')

app.use(bodyParser())
app.use("/api/users",UserRouter)


app.get("/api/random-joke",async (req,res)=>{
    try{
        let joke = await axios.get("https://api.chucknorris.io/jokes/random")
        console.log()
        res.json({flag:true,data:joke.data.value})
    }
    catch(e){
        res.json({flag:false,message:e.message})
    }
   
})

app.listen("5000")