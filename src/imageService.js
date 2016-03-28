var rp = require('request-promise');

var IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
var IMGUR_ENDPOINT = 'https://api.imgur.com/3/gallery/t/';

var imageService = {
  query: function query(queryString, pageNumber) {
    pageNumber = !isNaN(pageNumber) ? pageNumber : 0;
    var request_options = {
      uri: IMGUR_ENDPOINT + encodeURIComponent(queryString) + '//' + pageNumber,
      headers: {
        'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID
      },
      json: true
    };

    return rp(request_options)
    .then(function(data) {
      return this.transformJSON(data);
    }.bind(this))
    .catch(function(err) {
      return { error: "API error" };
    });
  },
  transformJSON: function transformJSON(data) {
    return data.data.items.map(function(item) {
      return {
        imageUrl: item.link,
        desc: item.title,
        pageUrl: 'http://i.imgur.com/' + item.id
      };
    });
  }
};

module.exports = imageService;
