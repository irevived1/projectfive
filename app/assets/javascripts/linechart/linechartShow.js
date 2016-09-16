
// Create an SVG for our chart.
var svg = d3.select("body").append("svg")
  .attr("width", 1000)
  .attr("height", 800)
  .append("g")
  .attr("transform", "translate(40,10)");
 
// Configure a chart.
var chart = LineChart(
{
  "parent": svg,
  "labels": [ "X", "Y" ],
  "data"  : [[-3,9],[-2,4],[-1,1],[0,0],[1,1],[2,4],[3,9]]
});
 
// Render the chart.
chart();