function shiftvalue(input,max) {
  // var length = count_digit(input);
  // length = length + Math.floor((length-1)/3);
  // return length;
  if (input > (max/2) ) {
    return 0;
  }
  else {
    return (8*count_digit(input));
  }
}

function count_digit(input) {
  return String(input).length;
}

function graphChanger(input) {
  hash = {
    "Graffiti Complaints":1,
    "Heating Complaints":2,
    "Illegal Parking Complaints":3,
    "Noise Complaints":4,
    "Restaurant Average Score":5,
    "Streetlight Complaints":6,
    "Amount Of Trees":7
  };
  return hash[input];
}

$(function () {
  
  $('form button').click(function(e) {
  // d3.select("svg").remove();
  $('body div#graphy').prepend("<p></p>");
  var firstptag = $('body div#graphy p:first-child')
  d3.csv("/assets/master.csv", function(error, data) {
    if (error) throw error;

    var tmp = Object.keys(data[0])
    var zipcode = tmp[0]
    var gname = graphChanger($('select[name="fname"]').val());
    var value=tmp[gname == undefined ? 1 : gname];
    var name_of_column = value.replace(/_/g," ");
    var typeofsort = $('select[name="typeofsort"]').val()
    firstptag.append('<h2 class="graphytitle">' + name_of_column.toUpperCase() + ' SORT BY ' + typeofsort.toUpperCase() + '</h3>');
    firstptag.append('<h3>' + tmp[0].toUpperCase() + '</h3>');

    var m = [60, 10, 10, 60],
        w = 800 - m[1] - m[3],
        h = (15*data.length) - m[0] - m[2];

    var format = d3.format(",.0f");

    var x = d3.scale.linear().range([0, w]),
        y = d3.scale.ordinal().rangeRoundBands([0, h], .1);

    var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
        yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var svg = d3.select("body div#graphy p:first-child").append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
      .append("g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // Parse numbers, and sort by SCORE.
    data.forEach(function(d) { d[value] = +d[value]; });
    if ( typeofsort == "value" ) {
      data.sort(function(a, b) { return b[value] - a[value]; });
    } else {
      data.sort(function(a, b) { return b[zipcode] - a[zipcode]; });
    }

    // Set the scale domain.
    x.domain([0, d3.max(data, function(d) { return d[value]; })]);
    y.domain(data.map(function(d) { return d[zipcode]; }));
    var max = d3.max(data, function(d) { return d[value]; });

    var bar = svg.selectAll("g.bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(0," + y(d[zipcode]) + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d[value]); })
        .attr("height", y.rangeBand());

    bar.append("text")
        .attr("class", "value")
        .attr("x", function(d) { return (x(d[value]) +  (shiftvalue((d[value]),max))   ); })
        .attr("y", y.rangeBand() / 2)
    //shiftvalue(x(d[value]))
        .attr("dx", -3 )
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return format(d[value]); });

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
  });
  e.preventDefault();
  });
});
// $(document).ready(function() {
//   window.restaurant_average_score = {};
//   $.ajax({
//       type: "GET",
//       url: "assets/restaurant_average_score.csv",
//       dataType: "text",
//       success: function(data) {processData(data);}
//    });
// });


// function processData(allText) {
//   var arr = allText.split("\n");
//   for (var i = 0, len = arr.length; i < len; i++) {
//     var morearr = arr[i].split(",");
//     window.restaurant_average_score[morearr[0]] = parseInt(morearr[1]);
//   }
// }
