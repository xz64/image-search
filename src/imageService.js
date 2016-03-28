var rp = require('request-promise');

var IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
var IMGUR_ENDPOINT = 'https://api.imgur.com/3/gallery/t/';

var imageService = {
  RECENT_SEARCH_LIMIT: 20,
  recentSearches: [],
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
      this.addRecentSearch(queryString);
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
  },
  addRecentSearch: function addRecentSearch(queryString) {
    this.recentSearches.push({
      query: queryString,
      time: new Date().toISOString()
    });
    if(this.recentSearches.length > this.RECENT_SEARCH_LIMIT) {
      this.recentSearches.shift();
    }
  }
};

module.exports = imageService;
