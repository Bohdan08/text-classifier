const express = require("express");
const cors = require('cors'); 
const querystring = require("querystring");
const app = express();
const url = require("url");
var bodyParser = require("body-parser");
const { MyClassificationPipeline } = require("./model");

app.use(cors()); // Enable CORS
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static("build")); // serve static files (css & js) from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
