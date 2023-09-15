const express = require("express");
const querystring = require("querystring");
const url = require("url");
const { MyClassificationPipeline } = require("./model");

const app = express();

// get instance
MyClassificationPipeline.getInstance();

// app.get("/", (req, res) => res.send("Server running"));

app.get("/api/classify", async (req, res) => {
  const parsedUrl = url.parse(req.url);

  const { text } = querystring.parse(parsedUrl.query);

  const classifier = await MyClassificationPipeline.getInstance();
  response = await classifier(text);
  
  res.json(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
