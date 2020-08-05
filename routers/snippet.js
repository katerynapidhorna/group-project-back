const { Router } = require("express");
const User = require("../models/").user;
const Snippets=require("../models").snippet;
const Tags = require("../models").tag;

const router = new Router();

router.get('/',async(req,res)=>{
  try{
    const response = await Snippets.findAll({include:[{model:Tags}]});
    res.send({snippets:response})
  } catch(e){
      console.log(e)
  }
})

router.put('/',async(req,res)=>{
  const data = req.body
  try{
    const updateSnippet = await Snippets.findByPk(data.snippetId);
    const updatedSnippet = updateSnippet.update({title:data.title,snippet:data.snippet})
    res.send(updateSnippet)

  }catch(e) {
    console.log(e)
  }
})




//create new snippet
router.post('/', async(req,res)=>{
  const data = req.body
  try{
    //check if there are all required parameters
    if(!data.title || !data.snippet || !data.userId) {
      res.status(400).send('absent one of the required parameters: title || snippet || userId');
      return;
    }
    //create new snippet
    const newSnippet = await Snippets.create({
                            title:data.title,
                            snippet:data.snippet,
                            // url:data.url,
                            userId:data.userId,
                          })  

    await SnippetTags.create({tagId:data.tag, snippetId:newSnippet.dataValues.id})                     
    res.send('ok')

  }catch(e) {
    console.log(e)
  }
})




module.exports = router;
