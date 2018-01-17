const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
// stringify helps stringify cirlular object
const stringify = require('json-stringify-safe');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// use cors to get access to cross origin browser
app.use(cors());

app.get('/getData', (req, res) => {
  axios.get('https://ricepo-interview-endpoint-td9mf5s8v12x.runkit.sh/:rest_id/menu')
  .then((data) => {
    res.send(stringify(data.data));
  })
  .catch((err) => {
    console.log(err);
  });
});

app.listen(8080, function () {
  console.log('listening to port 8080');
});
