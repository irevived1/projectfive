$(document).ready(function() {
  window.restaurant_average_score = {};
  $.ajax({
      type: "GET",
      url: "/assets/restaurant_average_score.csv",
      dataType: "text",
      success: function(data) {processData(data);}
   });
});


function processData(allText) {
  var arr = allText.split("\n");
  for (var i = 0, len = arr.length; i < len; i++) {
    var morearr = arr[i].split(",");
    window.restaurant_average_score[morearr[0]] = parseInt(morearr[1]);
  }
}
