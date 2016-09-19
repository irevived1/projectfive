  var theta = $("#theta").data("theta");
  var self = this;
  
  if (theta) {
    drawCharts(theta);
  } else {
    // drawLineChart(0);
  }


function drawCharts(theta){
  
  if (theta !== 0) {
    // var first = $("input#term1").text();
    // var second = $("input#term2").text();
    // var first = $('select')[0].value;
    // var second  = $('select')[1].value;
    
    var filename = $("#file").data("file");
    var first = $("#term1").data("first");
    var second = $("#term2").data("second");

    var fetchData = function(n1, n2) {
      $.ajax({
        type: "GET",
        url: "/assets/" + filename,//food_price.csv",
        dataType: "text",
        success: function(data) {  
          parsedData = d3.csv.parse(data);

          var l_data = dataForLineChart(parsedData, n1, n2);
          buildLineChart(l_data, n1, n2);
          var p_data = dataForPieChart(parsedData, n1, n2);
          buildPieChart(p_data, n1, n2)
        }
      });
    }

    fetchData(first, second);
  } else {
    var initData = [
      {
        values: [{x:0, y:0}],
        key: 'Prediction',
        color: '#E91E63'
      }
    ];
    buildLineChart(initData, 'none', 'none');
  }

  function buildLineChart(parsedData, firstData, secondData) {
    nv.addGraph(function() {
      var chart = nv.models.lineChart()
        .margin({left: 100})
        .useInteractiveGuideline(false)
        .showLegend(true)
        .showYAxis(true)
        .showXAxis(true)
        ;
      // chart.forceX([100, 200]);
      // chart.forceY([100, 200]);
      chart.xAxis
        .axisLabel(firstData)
        .tickFormat(d3.format('.02f'))
        ;

      chart.yAxis
        .axisLabel(secondData)
        .tickFormat(d3.format('.02f'))
        ;
      
      d3.select('#chart svg')
        .datum(parsedData)
        .transition().duration(500)
        .call(chart)
        ;

      nv.utils.windowResize(chart.update);

      return chart;
    });
  }

 function dataForLineChart(data, term1, term2) {
    var r = [];

    var max = Math.max.apply(Math, data.map(function(o){
      return o[term1];
    }));

    var min = Math.min.apply(Math, data.map(function(o){
      return o[term1];
    }));

    for (var i = min; i <= max; i++) {
      var prediction = theta * i;
      r.push({x: i, y: prediction});
    }

    return [
      {
        values: r,
        key: 'Prediction',
        color: '#01579B'
      }
    ];
  }
}


// Create the donut pie chart and insert it onto the page
function buildPieChart(parsedData, firstData, secondData) {
  nv.addGraph(function() {
    var donutChart = nv.models.pieChart()
        .x(function(d) {
          return d.label
        })
        .y(function(d) {
          return d.value
        })
        .showLabels(true)
        .showLegend(false)
        .labelThreshold(.05)
        .labelType("key")
        .color(["#965251", "#00b3ca"])
        .tooltipContent(
          function(key, y, e, graph) { return 'Custom tooltip string' }
        ) // This is for when I turn on tooltips
        .tooltips(false)
        .donut(true)
        .donutRatio(0.35);
    
      // Insert text into the center of the donut
      function centerText(data) {
        return function() {
          var svg = d3.select("svg#chartsvg");

          var donut = svg.selectAll("g.nv-slice").filter(
            function (d, i) {
              return i == 0;
            }
          );
          
          // Insert first line of text into middle of donut pie chart
          donut.insert("text", "g")
              .text("x: " + Math.round(data[0]["value"]))
              .attr("class", "middle")
              .attr("text-anchor", "middle")
              .attr("dy", "-.55em")
              .style("fill", "#965251")
              .style("font-size", "1.5em");
          // Insert second line of text into middle of donut pie chart
          donut.insert("text", "g")
              .text("y: " + Math.round(data[1]["value"]))
              .attr("class", "middle")
              .attr("text-anchor", "middle")
              .attr("dy", ".85em")
              .style("fill", "#00b3ca")
              .style("font-size", "1.5em");
        }
      }
    
    // Put the donut pie chart together
    d3.select("#donut-chart svg")
      .datum(parsedData)
      .transition().duration(300)
      .call(donutChart)
      .call(centerText(parsedData));
      
    return donutChart;
  });

}

// Seed data to populate donut pie chart
function dataForPieChart(data, term1, term2) {
    var maxX = Math.max.apply(Math, data.map(function(o){
      return o[term1];
    }));

    var minX = Math.min.apply(Math, data.map(function(o){
      return o[term1];
    }));

    var maxY = Math.max.apply(Math, data.map(function(o){
      return o[term2];
    }));

    var minY = Math.min.apply(Math, data.map(function(o){
      return o[term2];
    }));

  return [
    {
      "label": term1,
      "value": (maxX + minX) / 2
    },
    {
      "label": term2,
      "value": (maxY + minY) / 2
    }
  ];
}