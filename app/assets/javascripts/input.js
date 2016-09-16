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
