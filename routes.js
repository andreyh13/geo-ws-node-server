const express = require('express');
const axios = require('axios');

// Get the router
const router = express.Router();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

router.route('/geows').post(function (req, res) {
  const output = req.body.output;
  const uri = req.body.uri;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credential', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (output === 'xml') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  }
  if (output === 'json') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }

  console.log(`URI: ${uri}`);

  axios.get(uri)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      console.log(response.data);

      if (output === 'json') {
        res.json(response.data);
      } else {
        res.send(response.data);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(error);
    });


});

module.exports = router;

function dateDisplayed(timestamp) {
  const date = new Date(timestamp);
  return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
