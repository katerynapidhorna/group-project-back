const { Router } = require("express");
const router = new Router();

const SnippetTag = require('../models').snippetTag


router.get('/', async(req,res) => {
  const response = await SnippetTag.findAll();
  res.send({snippetTag:response})
})





module.exports = router;