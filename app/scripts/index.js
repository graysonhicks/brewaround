window.jQuery = $ = require('jquery');
var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');
var dotdotdot = require('dotdotdot');
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
    $('.search-button').html('Searching! <i class="fa fa-cog fa-spin"></i>');
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
        var breweries = body.toJSON();
        console.log(breweries);
        doTemplate('.main-content', '#results-template', breweries);
        viewUpdates();
          }
        });
      }

function doTemplate(target, source, context){ // homemade handlebars process function
  var sourceTemplate = $(source).html();
  var template = handlebars.compile(sourceTemplate);
  $(target).html(template(context));
  $(document).ready(function(){
    console.log('dot');
   $(".description-wrapper").dotdotdot({
     height: 100,
     after: "a.readmore"
   });
  });
}

function viewUpdates(){
    $('.search-button').html('Search again!');
    $('.zip-search-form').val("");
    $('.main-content').addClass('raised-main-content');
    $('.welcome-col-container').removeClass('col-md-6 col-md-offset-3');
    $('.welcome-col-container').addClass('col-md-12');
    $('.welcome-panel-heading').addClass('welcome-panel-heading-searched');
    $('.welcome-panel-heading').append('<i class="fa fa-beer beer-logo-searched"></i>');
    $('.search-input-group').addClass('search-input-group-searched');
    $('.search-button-container').addClass('search-button-container-searched');
}
