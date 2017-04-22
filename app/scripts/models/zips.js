var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var ZipCodeModel = Backbone.Model.extend({

});

var ZipCodesCollection = Backbone.Collection.extend({
  model: ZipCodeModel,
  url: 'https://secure.geonames.org/findNearbyPostalCodesJSON?country=USA&username=graysonhicks&maxRows=1',
  parse: function(data){
    return data["postalCodes"];
   }
});

module.exports = {
  "ZipCodeModel": ZipCodeModel,
  "ZipCodesCollection": ZipCodesCollection
};
