var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var BeerModel = Backbone.Model.extend({

});

var BeerCollection = Backbone.Collection.extend({
  model: BeerModel,
  url: function(){
    return 'http://localhost:' + process.env.PORT + '/api'; // set this as api url so that node server can listen here
  },
  parse: function(data){ // parse data on return
    return data.data;
   }
});

module.exports = {
  "BeerModel": BeerModel,
  "BeerCollection": BeerCollection
};
