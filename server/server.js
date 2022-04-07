const path = require("path")
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const {token} = require("../config.js");

const app = express();
const PORT = 3000;
const apiHost = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/overview/:product_id', (req, res) => {
  const {product_id} = req.params;
  const options = {
    headers: {Authorization: token}
  };

  axios.get(`${apiHost}/products/${product_id}/styles/`, options)
  .then(async ({data: {results: styleData}}) => {
    const {data: generalData} = await axios.get(`${apiHost}/products/${product_id}`, options);
    const data = { styleData, ...generalData};
    res.send(data)
  })
  .catch(err => res.sendStatus(500))
})


app.get('/reviews/:product_id/:sort', (req, res) => {
  var {product_id, sort} = req.params;
  var url = `${apiHost}/reviews/?product_id=${product_id}&sort=${sort}&page=1&count=2`;
  axios.get(url, {
    headers: {
      Authorization: token
    }
  })
  .then(data => res.send(data.data))
  .catch(err => res.sendStatus(500))
})

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});