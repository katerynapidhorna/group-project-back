const { Router } = require("express");
const User = require("../models/").user;
const Snippets=require("../models").snippet;

const router = new Router();

router.get('/',async(req,res)=>{
  try{
    const response = await Snippets.findAll();
    res.send(response)
  } catch(e){
      console.log(e)
  }
})


//create new snippet
router.post('/', async(req,res)=>{
  const data = req.body
  try{
    //check if there are all required parameters
    if(!data.title || !data.snippet || !data.tagId || userId) {
      res.status(400).send('absent one of the required parameters: title || snippet || tagId');
      return;
    }
    //create new snippet
    const newSnippet = await Snippets.create({
                            title:data.title,
                            snippet:data.snippet,
                            // url:data.url,
                            tagId,
                            userId:data.userId,
                          })

    await SnippetTags.create({tagId:data.tag, snippetId:newSnippet.dataValues.id})                     
    res.send('ok')

  }catch(e) {
    console.log(e)
  }
})




module.exports = router;
