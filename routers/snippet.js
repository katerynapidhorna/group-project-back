const { Router } = require("express");
const User = require("../models/").user;
const Snippets = require("../models").snippet;
const Tags = require("../models").tag;
const auth = require("../auth/middleware");
const SnippetTags = require("../models").snippetTag;
const { newColor } = require("../color");

console.log(newColor);

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

  console.log("RES", data.tag);

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
      userId: userId,
    });

    let numbersOnly = (val) => {
      if (typeof val === "number") {
        return val;
      }
    };
    const numberTags = data.tag.filter(numbersOnly);

    let newRelation = await SnippetTags.bulkCreate(
      numberTags.map((id) => {
        return { tagId: id, snippetId: newSnippet.dataValues.id };
      })
    );

    let stringsOnly = (val) => {
      if (typeof val === "string") {
        return val;
      }
    };
    const stringTags = data.tag.filter(stringsOnly);

    const newTag = await Tags.bulkCreate(
      stringTags.map((tag) => {
        return { name: tag, color: newColor };
      })
    );
    const response = await SnippetTags.bulkCreate(
      newTag.map((tag) => {
        return {
          tagId: tag.dataValues.id,
          snippetId: newSnippet.dataValues.id,
        };
      })
    );

    res.send(newSnippet);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const snippet = await Snippets.findByPk(id);

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
