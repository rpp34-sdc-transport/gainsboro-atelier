const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});