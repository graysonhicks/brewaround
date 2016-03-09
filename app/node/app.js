var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)


app.get('/api', function(req, res){ // listens for request on /api route
  var lat = req.query.lat; // grabs lat and lng queries from the request object
  var lng = req.query.lng;
  request('https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasImages=Y&key=72a751214ab8b53056ac0a6d8376dc2d', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      res.send(body); // if no errors, send the body of data back to front end
    }
   });
});

app.listen(3000);
console.log('Server running on port %d', 3000);


// 'https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasLabel=Y&key=72a751214ab8b53056ac0a6d8376dc2d'
