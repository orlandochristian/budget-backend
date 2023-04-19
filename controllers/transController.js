const express = require('express');
const transController = express.Router();


const transArray = require("../models/transactions.js");  

transController.get("/", (req, res) => {    
    res.send(transArray);    
}); 


transController.get("/:index", (req,res) => {
    const { index } = req.params

    // if (transArray.find((e)=> ))

    if (transArray[index]) {
        res.send(transArray[index])
    } else {
        res.redirect("/400")
    }  
})



transController.post('/', (req, res) => {
    const transaction = {
        transctionId: Math.floor(Math.random() * 999999),
        item_name: req.body.item_name,
        amount: req.body.amount,
        date: req.body.date,
        from: req.body.from,
        category: req.body.category,
      }
    transArray.push(transaction)
      res.json(transArray[transArray.length - 1]);
   
  })

  transController.put('/:index', (req, res) => {
    const { index } = req.params;
    if(transArray[index]) {
      transArray[index] = req.body ;
      res.status(200).json({ status: 200, message: "resource updated" });
    } else {
      res.redirect("/404")
    }
  })


  transController.delete('/:index', (req, res) => {
    const { index } = req.params;
    if(transArray[index]) {
      transArray.splice(index, 1);
      res.status(200).json({ status: 200, message: "resource deleted" });
    } else {
      res.redirect("/404")
    }
  })

module.exports = transController;