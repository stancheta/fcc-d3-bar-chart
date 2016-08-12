(function() {
  var dataURL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

  var getData = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
        console.log('The Server Returned an Error');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('There was a connection error');
    };
    request.send();
  }

  handleData = function(data) {
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    
  }

  // setup
  getData(dataURL, handleData);
})();
