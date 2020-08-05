const { Router } = require("express");
const router = new Router();

const Tags = require('../models').tag

router.get('/', async(req,res,next)=>{
  try{

    const data = await Tags.findAll();
    console.log(data)
    res.send({tags:data})

  }catch(e) {
    next(e)
  }
})

module.exports = router;