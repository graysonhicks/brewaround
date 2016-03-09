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


$('.search-button').on('click', function(){ // on click of search
    var location = $('.zip-search-form').val(); //get search term and save
    $('.search-button').html('Searching! <i class="fa fa-cog fa-spin"></i>'); // change to searching icon
    zipSearch.fetch({data:{
      postalcode: location
    }}).done(function(data){ // when done, grab data
      var lat = data.postalCodes[0].lat; // pull lat and long out of its first result
      var lng = data.postalCodes[0].lng;
      getBeer(lat, lng); // now run getBeer, passing it lat and lng
  });
});

function getBeer(lat, lng){
  beerSearch.fetch({ //call api with node server, passing it lat and lng as queries
        data: {
          lat: lat,
          lng: lng
        },
        success:function(body){ //when done grab the body data that the node server returned
        var breweries = body.toJSON(); //parse to JSON and store
        console.log(breweries);
        doTemplate('.main-content', '#results-template', breweries);//pass brewery info in to template
        viewUpdates(); //update styling and CSS classes
          }
        });
      }

function doTemplate(target, source, context){ // homemade handlebars process function
  var sourceTemplate = $(source).html();
  var template = handlebars.compile(sourceTemplate);
  $(target).html(template(context));
  $(document).ready(function(){
   $(".description-wrapper").dotdotdot({ //dotdotdot plugin to limit the length of brewery descriptions
     height: 100,
     after: "a.readmore"
   });
  });
}

function viewUpdates(){
    $('.search-button').html('Search again!'); // update search button
    $('.zip-search-form').val(""); //clear search term
    $('.main-content').addClass('raised-main-content'); //shrink padding on top
    $('.welcome-col-container').removeClass('col-md-6 col-md-offset-3'); // change width of container
    $('.welcome-col-container').addClass('col-md-12');
    $('.welcome-panel-heading').addClass('welcome-panel-heading-searched'); // force search group inline
    $('.welcome-panel-heading').append('<i class="fa fa-beer beer-logo-searched"></i>');
    $('.search-input-group').addClass('search-input-group-searched');
    $('.search-button-container').addClass('search-button-container-searched');
}
