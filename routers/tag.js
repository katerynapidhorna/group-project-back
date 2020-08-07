const { Router } = require("express");
const router = new Router();

const Tags = require('../models').tag

router.get('/', async(req,res,next)=>{
  try{

    const data = await Tags.findAll();
    res.send({tags:data})

  }catch(e) {
    next(e)
  }
})

router.post('/', async(req,res,next)=>{
  const data = req.body;
  try{
    const newTag = await Tags.create({name:data.name,color:data.color})
    res.send(newTag)
  } catch(e) {
    next(e)
  }
})

module.exports = router;
