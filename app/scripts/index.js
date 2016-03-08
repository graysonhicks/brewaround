var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var ZipJS = require('./models/zips');
var ZipCodeModel = ZipJS.ZipCodeModel;
var ZipCodesCollection = ZipJS.ZipCodesCollection;

var BeerJS = require('./models/beers');
var BeerModel = BeerJS.BeerModel;
var BeerCollection = BeerJS.BeerCollection;

var beerSearch = new BeerCollection();
var zipSearch = new ZipCodesCollection();

console.log(ZipJS);
console.log(BeerModel);
//
// zipSearch.fetch().then(function(data){
//   console.log(data);
// });

$('.search-button').on('click', function(){
    var userZip = $('.zip-search-form').val();
    zipSearch.fetch({
      data: {
        postalcode: userZip
      }
    }).done(function(data){
      var lat = data.postalCodes[0].lat;
      var lng = data.postalCodes[0].lng;
      getBeer(lat, lng);
    });
});

function getBeer(lat, lng){
  beerSearch.fetch({
        data: {
          lat: lat,
          lng: lng
        },
        success:function(body){
        console.log(body.toJSON());
          }
        });
      }
