const express = require('express');
const transController = express.Router();


const transArray = require("../models/transactions.js");  
const { off } = require('../app.js');

transController.get("/", (req, res) => {    
    res.send(transArray);    
}); 


transController.get("/:id", (req,res) => {
    const { id } = req.params
 
     if (transArray.find(element=>   element.transctionId == id )) {
        res.send(transArray.find((e)=> e.transctionId == id))
     } else {
        res.redirect("/400")
     }

   
})



transController.post('/', (req, res) => {
    const transaction = {
        transctionId: Math.floor(Math.random() * 999999),
        item_name: req.body.item_name,
        amount: Number(req.body.amount),
        date: req.body.date,
        from: req.body.from,
        category: req.body.category,
      }
    transArray.push(transaction)
      res.json(transArray[transArray.length - 1]);
   
  })

  transController.put('/:id', (req, res) => {
    const { id } = req.params;
    let indexArr = transArray.map((e,i) => {
        if (e.transctionId == id ) {
            return i
        }
        return -1
    })
   
    if (indexArr.find(e => e != -1)) {
        transArray[indexArr.find(e => Number(e) != -1)] = req.body;
        res.status(200).json({ status: 200, message: "resource deleted" });
    }else{
        res.redirect("/404")
    }

   
  })
    


  transController.delete('/:id', (req, res) => {
    const { id } = req.params;
    let indexArr = transArray.map((e,i) => {
        if (e.transctionId == id ) {
            return i
        }
        return -1
    })
   
    if (indexArr.find(e => e != -1)) {
        transArray.splice(indexArr.find(e => Number(e) != -1), 1);
        res.status(200).json({ status: 200, message: "resource deleted" });
    }else{
        res.redirect("/404")
    }

   
  })

module.exports = transController;