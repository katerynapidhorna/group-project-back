const { Router } = require("express");
const User = require("../models/").user;
const Snippets=require("../models").sinppet;

const router = new Router();

router.get('/',async(req,res)=>{
  try{
    const response = await Snippets.findAll();
    res.send(response)
  } catch(e){
      console.log(e)
  }
})
module.exports = router;
