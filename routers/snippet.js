const { Router } = require("express");
const User = require("../models/").user;
const Snippets = require("../models").snippet;
const Tags = require("../models").tag;
const auth = require("../auth/middleware");
const SnippetTags = require("../models").snippetTag;

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
  try {
    //check if there are all required parameters
    if (!data.title || !data.snippet || !userId) {
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

    await SnippetTags.create({
      tagId: data.tag,
      snippetId: newSnippet.dataValues.id,
    });
    res.send("ok");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    /// const userId=2;
    // console.log(id,"id")
    const snippet = await Snippets.findByPk(id);
    //console.log("delete",snippet)
    if (!snippet) {
      res.status(404).send("snippet not found");
    } else {
      await SnippetTags.destroy({ where: { snippetId: id } });
      await snippet.destroy();
      const response = await Snippets.findAll({ include: [{ model: Tags }] });
      console.log("response ", { snippets: response });
      res.send({ snippets: response });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
