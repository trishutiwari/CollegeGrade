var main = function () {
 assignGrades();
 numClasses();
 graphAvg($(".graph").css("width"),
	       $(".graph").css("padding"),
	       $(".graph").css("height"));
 displayStats();
 $(".addGradesBtn").click(function () {
 $('body').append(`<table class="addAssignTble table table-striped" style="display:none;"> 
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                     </table>`);
 $('.addAssignTble > tbody').prepend(`<tr class="addAssign">
	              <td colspan=2>
	               <form method="post" role="form" name="assignmentName">
		        <div class="form-group">
			 <label>Assignment Name</label>
			 <input type="text" class="form-control" name='assignmentName'>
			</div>
		        <button style='display:-webkit-box; margin:auto;' type="submit" class="btn btn-secondary submitAssign">Submit</button>
		       </form>
		      </td>
		     </tr>`);
 $(".addAssignTble").css('margin-left','36%');
 $('.mask').fadeIn(500);
 $('.addAssignTble').fadeIn(500);
 $('.addAssignTble').css('z-index','3');
 $('body').append(`<div class="addingGrades" style="display:none;">addingGrades</div>`);
 });
 $('.mask').click(function () {
 $('.addAssignTble').remove();
 $('.mask').fadeOut(500);
 $('.addingGrades').remove();
});
 gradeAvg();
}

var numClasses = function () {
 //for now we're assigning a random number of classes to the navigation bar, but later we must query
  var numClass = Math.floor((Math.random() * 10) + 1);
  for (var i =0; i <= numClass; i++) {
  $('.nav').append('<li><a href=?class='+i+'>Class '+i+'</a></li>');
  }

}
var assignGrades = function () {
 //query the database for the final grades for each class and add row for each
 //for now we're again using a random number generator for number of classes
 switch ($('.submittedAssign').text()) {
  case 'submittedAssign':
   $('.addGradesBtn').hide();
   var students = $('.numStu').text();
   $('.addGradesDiv').hide();
   $('.addAssign').remove();
   $('.graph').css("top",'11%');
   $('.tableContainer').css('top','20%');
   $('thead').append('<tr><th>Student</th><th style="text-align:center;">Score</th></tr>');
   break;
  default:
   return null;
 }
 //looping over to create as many rows as there are students
 for (var i = 0; i < students; i++){
  var score = 'score' + i;
  //we're going to use a random number for the grade and average as well
  $("tbody").append("<tr>\
		    <td style='text-align:center;'>SomeStudent</td>\
		    <td style='text-align:center;'>\
		     <input type='text' name="+score+">\
		    </td>\
		   </tr>");
 }
 $("tbody").append(`<tr>
		     <td colspan="2" style="background-color:white;">
		      <button style="margin:auto; display:-webkit-box" type="submit" class="btn btn-secondary submitGrades">Submit Grades</button>
		     </td>
		    </tr>`)
}

var displayStats = function () {
 switch ($(".submittedGrades").text()) {
  case "submittedGrades":
   $('.graph').css("top",'7%');
   $('table').remove();
   $('form').append(`<table class="table table-striped"> 
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                     </table>`);
   $('thead').append(`<tr><th colspan=2 style='text-align:center;'>Statistics</th></tr>`); 
   $('tbody').append(`<tr><td>Assignment</td><td>Homework 9</td></tr>`); 
   $('tbody').append(`<tr><td>Average</td><td>85</td></tr>`); 
   $('tbody').append(`<tr><td>Standard Deviation</td><td>10.1</td></tr>`);
   $('.addGradesDiv').show();
  default:
   return null;
 }

}

var gradeAvg = function () {
//query for the average of each Assignment:
//we should pull from a database, but for now just random data:
 if ($(".addingGrades").text() === "addingGrades" || $('.submittedAssign').text() === 'submittedAssign' || $(".submittedGrades").text() === "submittedGrades") {
  return null;
 }
 var numAssign = Math.floor((Math.random() * 10) + 1);
 $('thead').append(`<tr><th>Assignment Name</th><th>Average Score</th></tr>`);  
 for (var i = 0; i < numAssign; i++) { 
  $('tbody').append(`<tr><td>SomeAssignment</td><td>85</td></tr>`);
 }
}

var graphAvg = function (w,p,h) {
 h = parseInt(h);
 w = parseInt(w);
 p = parseInt(p);
 var svg = d3.select('svg');
 var myscores = [[0,50],[1,80],[2,78],[3,86],[4,89],[5,78],[6,78],[7,89],[8,79]];
 var xmaxi = d3.max(myscores,function (subarr) {return subarr[0]});
 var yscale = d3.scale.linear().domain([0,100]).range([h-(3.5*p),p]).clamp(true);
 var xscale = d3.scale.linear().domain([0,xmaxi]).range([p,w-(3.5*p)]).clamp(true);
 var xaxis = d3.svg.axis().scale(xscale).orient("bottom");
 var yaxis = d3.svg.axis().scale(yscale).orient("left");
 var mylin = d3.svg.line()
  .x(function (d) {return xscale(d[0]);})
  .y(function(d) {return yscale(d[1]);})
  .interpolate("basis");
 svg.append('path').attr('d',mylin(myscores)).attr('stroke', 'black').attr('stroke-width', 2).attr('fill', 'none');//passing the dataset into the mylin instance 
 //will allow it to create the svg path attribute in the correct format
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - (3.5*p)) + ")").call(xaxis); 
 svg.append("g").attr("class","axis").attr("transform", "translate(" +p+ ",0)").call(yaxis);
}
