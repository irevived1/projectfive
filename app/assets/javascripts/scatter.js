var keys, url;
var filename;
var filename = $("#file").data("file");

if (filename !== "") {
  url = "/assets/" + filename; 
  $('.jumbotron h1').html(capitalizeEachWord(filename.replace(/\.\w*/,"").replace(/_/g," ")) + ", visualized");
} else {
  url = "/assets/master.csv";
}

var load = function (n1, n2) {  
  $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
    success: function(data) {  
      parsedData = d3.csvParse(data);   
      firstData = Object.keys(parsedData[0])[n1];
      secondData = Object.keys(parsedData[0])[n2];
      keys = Object.keys(parsedData[0]);
      if (keys.length - 1 > $('select.splot')[0].length ) {
        keys.forEach(function (key, index) {
	  if (key !== "") {
	    $('select').append("<option value=" + index + ">" + capitalizeEachWord(key.replace(/_/g," ")) + "</option>");
	  }
        })
      }
      buildChart(parsedData, firstData, secondData);
      return data;
    }
  })
}
// data(5, 7);

$('select').change(function () {
  // debugger;
  d3.select('svg').remove();
  var first = $('select')[0].value;
  var second  = $('select')[1].value;
  load(first, second);
})
load(0,0);
// function getSecondDataSet (firstDataset) {
//   $.ajax({
//     type: "GET",
//     url: "/assets/noise_complaints.csv",
//     dataType: "text",
//     success: function(data) { 
//       debugger;
//       parsedData = d3.csvParse(data); 
//       buildChart(firstDataset, parsedData);
//       return data;
//     }
//   })
// }

function buildChart (dataset, firstData, secondData) {
  // debugger;
  //COLORS for circles and triangles
  // template from: http://codepen.io/sasidhar2992/pen/jbgbwV
  var firstColor = "#33A1FD";
  var secondColor = "#FDCA40"; 

  //data object to hold parsed data
  var stagingData = [];
  //parse the sample data into the data object D3 expects
  dataset.forEach(function(entry) { 
    var tempArray = []; 
    if (entry !== undefined) {
      tempArray.push(entry[firstData]);
      tempArray.push(entry[secondData]); 
      // if (entry.zipcode !== undefined) {
	tempArray.push(entry.zipcode); 
      // } else {
	// tempArray.push(entry.Date);
      // }
      stagingData.push(tempArray);
    } 
  }); 

  //Create object with counted occurences
  var counts = _.countBy(stagingData);
  //Sort that object's counts and reverse to get highest at 0
  var sorted = _.sortBy(counts).reverse();
  //The highest count
  var highestCount = sorted[0];

  //This is going to be the data that d3 uses after we do stuff to get it right
  var data = [];

  //Avoid duplicate entries by looping through counts instead
  //of originalData. Go through each count and get the values from the keys
  _.forOwn(counts, function(value, key) {
    var result = key.split(",");
    var tempArray = [];
    tempArray.push(parseInt(result[0]));
    // tempArray.push(parseInt(result[1]));
    // debugger;
    if (result[2] === "") {
      tempArray.push(parseInt(result[1]));
      tempArray.push(result[1]); 
    } else {
      tempArray.push(parseInt(result[1]));
      tempArray.push(parseInt(result[2]));
    }
    // console.log(tempArray);
    data.push(tempArray);
  });
  

  //Dimensions
  var margin = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
  };
  var width = 800 - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;

  //Get and set maxValue
  var maxX = d3.max(data, function(d) {
    return d[0];
  })

  var maxY = d3.max(data, function(d) {
    return d[1];
  })

  var minX = d3.min(data, function(d) {
    return d[0];
  })

  var minY = d3.min(data, function(d) {
    return d[1];
  })

  var maxValue = 0;

  if (maxX > maxY) {
    maxValue = maxX;
  } else {
    maxValue = maxY;
  }

  //Set X range and domain
    var x = d3.scaleLinear()
      .range([0, width])
      .domain([minX, maxX]); 
  //Set Y range and domain
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([minY, maxY]);

    //Prime axis
    var xAxis = d3.axisBottom(x).ticks(10).tickSize(-height);
    var yAxis = d3.axisLeft(y).ticks(10 * height / width).tickSize(-width);

    //Draw the shell
    // $('.chart').children().hide();
    var svg = d3.select("#scatter-plot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Draw triangles
    var trianglePoints = "0 " + height + ", " + height + " 0, " + height + " " + height;
    var secondTrianglePoints = "0 0, 0 " + height + ", " + height + " 0";

    // svg.append('polyline')
    // .attr('points', trianglePoints)
    // .style('fill', '#000000');

    // svg.append('polyline')
    // .attr('points', secondTrianglePoints)
    // .style('fill', '#808080');

    //Draw the axis
    svg.append("g")
      .attr("class", "x axis ")
      .attr('id', "axis--x")
      .attr("transform", "translate(" + minX + "," + height + ")")
      .call(xAxis);
    
    svg.append("g")
      .attr("class", "y axis")
      .attr('id', "axis--y")
      .call(yAxis);

    //Draw the dots
  var r = d3.scaleLinear()
    //Range for dot sizes
    .range([5, 20])
    //Set the domain from data values
    .domain([1, highestCount]);

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {
	var thisCount = counts[d[0] + "," + d[1]];
	return r(parseInt(thisCount));
      })
    .attr("cx", function(d) {
      return x(parseInt(d[0]));
    })
    .attr("cy", function(d) {
      return y(parseInt(d[1]));
    })
    .attr("opacity", .5)
    .style("fill", function(d) {
      if (d[0] > d[1]) {
	return firstColor;
      } else {
	return secondColor;
      }
    });




  //Draw the labels
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(300,580)")
    .style('fill','#6395AA')
    .text(capitalizeEachWord(firstData.replace(/_/g," ")));

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-30,300) rotate(-90)")
    .style('fill', '#6395AA')
    .text(capitalizeEachWord(secondData.replace(/_/g," ")));
  //Tipsy, to display the values
   $('svg circle').tipsy({
     fade: true,
     gravity: 'w',
     html: true,
     trigger: 'focus',
     title: function() {
       d = this.__data__; 
       return capitalizeEachWord(firstData.replace(/_/g," ")) + ": " + d[0] + "<br>" + capitalizeEachWord(secondData.replace(/_/g," ")) + ": " + d[1] + "<br>" + capitalizeEachWord(keys[0].replace(/_/g," ")) + ": " + d[2] +"<br/>"
     }
   });
   $('.dot').click(function (event) {  
     alert('called');
     $('#tipsy').appendTo('#tipsy-text');
    })
}
