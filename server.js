const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const ifaces = require('os').networkInterfaces();

// express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Set port
const port = process.env.PORT || 3000;        // set the port

// Define a prefix for all routes
// Can define something unique like MyRestAPI
// We'll just leave it so all routes are relative to '/'
app.use('/', routes);

// Start server listening on port 3000
app.listen(port);
console.log('GeoWs node server listening on port: ' + port);

// Iterate over interfaces ...
const adresses = Object.keys(ifaces).reduce(function (result, dev) {
  return result.concat(ifaces[dev].reduce(function (result1, details) {
    return result1.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
  }, []));
});

console.log(adresses);
