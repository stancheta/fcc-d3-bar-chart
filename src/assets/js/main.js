/* globals XMLHttpRequest, d3 */

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
  };

  var handleData = function(data) {
    var width = 850;
    var height = 500;

    var parseDate = d3.time.format("%Y-%m-%d").parse;
    var formatDate = d3.time.format("%Y");

    var svg = d3.select(".chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");


    var fData = data.data.map(function(d) {
      return {date: parseDate(d[0]), value: +d[1]};
    });
    // var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear()
              .range([height, 0])
              .domain([0, d3.max(fData, function(d) { return d.value; })]);
    // var xAxis = d3.svg.axis().scale(x)
		//   .orient("bottom").tickFormat(formatDate);
    var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], 0)
              .domain(fData.map(function(d) { return d.date; }));

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

    svg.selectAll(".bar")
       .data(fData)
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return x(d.date); })
       .attr("width", x.rangeBand())
       .attr("y", function(d) { return y(d.value); })
       .attr("height", function(d) { return height - y(d.value); });
  };

  // setup
  getData(dataURL, handleData);
})();
