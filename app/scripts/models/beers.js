var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var BeerModel = Backbone.Model.extend({

});

var BeerCollection = Backbone.Collection.extend({
  model: BeerModel,
  url: function(){
    return 'http://localhost:3000/api';
  },
  parse: function(data){
    return data.data;
   }
});

module.exports = {
  "BeerModel": BeerModel,
  "BeerCollection": BeerCollection
};
