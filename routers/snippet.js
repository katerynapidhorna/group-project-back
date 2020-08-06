const { Router } = require("express");
const User = require("../models/").user;
const Snippets = require("../models").snippet;
const SnippetTags = require("../models").SnippetTags;
const Tags = require("../models").tag;
const auth = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const response = await Snippets.findAll({ include: [{ model: Tags }] });
    res.send({ snippets: response });
  } catch (e) {
    console.log(e);
  }
});

router.put("/", async (req, res) => {
  const data = req.body;
  try {
    const updateSnippet = await Snippets.findByPk(data.snippetId);
    const updatedSnippet = updateSnippet.update({
      title: data.title,
      snippet: data.snippet,
    });
    res.send(updateSnippet);
  } catch (e) {
    console.log(e);
  }
});

//create new snippet
router.post("/", auth, async (req, res) => {
  const userLogged = req.user.dataValues;
  const userId = userLogged.id;
  
  const data = req.body;

  console.log("RES", data.tag)

  try {
    //check if there are all required parameters
    if (!data.title || !data.snippet || !data.tag || !userId) {
      res
        .status(400)
        .send(
          "absent one of the required parameters: title || snippet || userId"
        );
      return;
    }
    //create new snippet
    const newSnippet = await Snippets.create({
      title: data.title,
      snippet: data.snippet,
      // url:data.url,
      userId: userId,
    });
    
    let numbersOnly = (val) => {
      if (typeof(val) === 'number'){
        return val
      }
    }
    const numberTags = data.tag.filter(numbersOnly)
    // const Tags = await Tags.findAll()
    // const TagIds = Tags.map(tag => tag.id)    
    // const newId = Math.max(...TagIds)+1
  
    numberTags.map(async tag => {
      await SnippetTags.create({
        tagId: tag,
        snippetId: newSnippet.dataValues.id,
      });
    })

    let stringsOnly = (val) => {
      if (typeof(val) === 'string'){
        return val
      }
    }
    const stringTags = data.tag.filter(stringsOnly)

    stringTags.map(async tag => {
     const newTag = await Tags.create({ name: tag, color: data.color });
     console.log("This is newTag", newTag)
    })

    
    
    
    res.send("ok");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
