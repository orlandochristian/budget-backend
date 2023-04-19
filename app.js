const express = require('express');
const cors = require('cors')
const app = express();


 const transController = require("./controllers/transController");


 app.use(express.json())
 app.use(cors()); 

app.get("/",(req,res)=> {
    res.send("Hello Welcome")
})



app.use("/transactions", transController);     

app.get("*", (req,res) => {
    res.status(400).json("Page Not Found")
})

module.exports = app;