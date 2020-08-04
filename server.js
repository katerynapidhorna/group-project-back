const express = require("express");

const Snippets = require('./models/').snippet;

const { PORT } = require("./config/constants");
const cors = require("cors");

const app = express();
app.use(cors());
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);




app.get('/snippets',async(req,res)=>{
  try{
    const response = await Snippets.findAll();
    res.send(response)
  } catch(e){
      console.log(e)
  }
})



app.listen(PORT, () => {
  console.log("Server up and running on:", PORT);
});