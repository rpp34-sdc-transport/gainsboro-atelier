const path = require("path")
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const bodyParser = require("body-parser");
const {token} = require("../config.js");
const uploadImages = require("../imageAPI/imageAPI.js");

const upload = multer({storage: multer.diskStorage({})});
const app = express();
const PORT = 3000;
const apiHost = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var options = {
  headers: {
    Authorization: token
  }
};

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

app.post('/cart', (req, res)=>{
  const {sku_id} = req.body;
  // console.log(sku_id);

  const url = `${apiHost}/cart`;
  const data = {
    'sku_id': sku_id
  }
  const options = {
    headers: {
      Authorization: token,
    }
  };

  axios.post(url, data, options)
  .then(()=>{
    return axios.get(url, options);
  })
  .then(({data})=>{
    res.status(201).send(data);
  })
  .catch((err)=>{
      // console.log('post cart err: ');
      res.sendStatus(500);
  })
})

app.get('/reviews', (req, res) => {
  var {product_id, sort, count} = req.query;
  var url = `${apiHost}/reviews?product_id=${product_id}&sort=${sort}&count=${count}`;
  axios.get(url, options)
  .then(data => {
    res.send(data.data.results)
  })
  .catch(err => res.sendStatus(500))
})


app.put('/reviews/:review_id/helpful', (req, res) => {
  var url = `${apiHost}/reviews/${req.params["review_id"]}/helpful`;
  axios.put(url, {}, options)
  .then(data => {
    res.sendStatus(data.status);
  })
  .catch(err => res.sendStatus(500))
})

app.get('/reviews/meta/:product_id', (req, res) => {
  var url = `${apiHost}/reviews/meta?product_id=${req.params.product_id}`;
  axios.get(url, options)
  .then(data => {
    // console.log('get meta from api', data.data);
    res.send(data.data)
  })
  .catch(err => res.sendStatus(500))
})

app.post('/reviews', upload.array("images"), (req, res) => {
  const {product_id, rating, summary, body, recommend, name, email, characteristics} = req.body;
  uploadImages(req.files)
  .then(data => {
    console.log('get url from cloudinary', data)
    var photos = data;
    var formData = {
      product_id: JSON.parse(product_id),
      rating: JSON.parse(rating),
      summary,
      body,
      recommend: JSON.parse(recommend),
      name,
      email,
      characteristics: JSON.parse(characteristics),
      photos
    }
    console.log('formData', formData);
    var config = {
      headers: {
        Authorization: token,
        'content-type': 'application/json'
      }
    }
    return axios.post(`${apiHost}/reviews`, formData, config)
  })
  .then(data => {
    console.log('upload successfully', data.data);
    res.send(data.data)
  })
  .catch(err => {
    console.log('err', err);
    res.sendStatus(500);
  })
})


app.get('/qa/questions', (req, res) => {
  var {product_id} = req.query;
  var url = `${apiHost}/qa/questions?product_id=${product_id}`;
  axios.get(url, {
    headers: {
      Authorization: token
    }
  })
  .then(data => res.send(data.data))
  .catch(err => res.sendStatus(500))
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  var body = req.body;
  var {question_id} = req.params;
  var url = `${apiHost}/qa/questions/${question_id}/answers`;
  axios.post(url, body,
    {
      'content-type': 'application/json',
      headers: {
      Authorization: token
    }
  })
  .then(data => {
    res.send(data.data)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
  var url = `${apiHost}/reviews/${req.params["review_id"]}/report`;
  axios.put(url, {}, options)
  .then(data => {
    // console.log('report api,', data.status);
    res.sendStatus(data.status);
  })
  // .catch(err => console.log(err))
})

app.get('/related', (req, res) => {
  var url = `${apiHost}/products?product_id=${product_id}/related`;
  var finalData = [];
    //get product_id's of related products
    axios.get(url)
    //should return an array of product id's
    //then we need to get the product info of each product in the array in the promise.
    .then(data => {

    })
})


app.post('/qa/questions', jsonParser, (req, res) => {
  var body = req.body;

  var url = `${apiHost}/qa/questions`;
  axios.post(url, body,
    {
      'content-type': 'application/json',
      headers: {
      Authorization: token
    }
  })
  .then(data => {
    res.send(data.data)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})



app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});