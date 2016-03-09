var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors());


app.get('/api', function(req, res){
  console.log(req.query.lat);
  console.log(req.query.lng);
  var lat = req.query.lat;
  var lng = req.query.lng;
  request('https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasImages=Y&key=72a751214ab8b53056ac0a6d8376dc2d', function (error, response, body) {
    if (!error && response.statusCode === 200) {

      res.send(body);
    }
   });
});

app.listen(3000);
console.log('Server running on port %d', 3000);


// 'https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasLabel=Y&key=72a751214ab8b53056ac0a6d8376dc2d'
