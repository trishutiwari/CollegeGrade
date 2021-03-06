var main = function (user,cls) {
   numberCourses();
   if (cls === "cumGrades") {
   graphGPAcum($(".graph").css("width"),
	       $(".graph").css("padding"),
	       $(".graph").css("height"));
   $('svg').after('<button type="button" class="btn btn-secondary gpaSecond">GPA current semester</button>');
   $('svg').after('<button type="button" class="btn btn-secondary gpaFirst">GPA per Semester </button>');
   }
   else {
   graphGrade($(".graph").css("width"),
	       $(".graph").css("padding"),
	       $(".graph").css("height"));
   $('.whichSem').text("Class " + cls);
   }
   gradeRows();
   $('.mask').hide();
   $(".sem").click(function () {
    $(".slideInMenu").animate({"margin-left": "0px"},500);
    $(this).hide();
    $(".mask").fadeIn(500);
    $(".mask").css("z-index","3");
    $(".slideInMenu").css("z-index","4");
    $(".sem").css("z-index","5")
   });
   $(".icon-close").click( function () {
    $(".slideInMenu").animate({"margin-left": "-450px"},500);
    $(".sem").fadeIn(500);
    $(".mask").fadeOut(500);
    $(".mask").css("z-index","0");
   });
   $('.mask').click(function () {
     $(".icon-close").click();
   });
   $(".semester").click(function () {
    $("table").remove();
    $(".gpaSecond").prop("disabled",true); //we will not store gpa vs time graphs for older semesters> We need to figure out how to enable when student comes back to
    //current semester
    selectOldTable($(this));
    $(".icon-close").click();
    $(".whichSem").text($(this).text());  
    $(".whichSem").width("200px");
   });
   $('.gpaSecond').click(function () {
   $(".graph").remove();
   $(".whichSem").after("<svg class='graph'></svg>");
   graphGPA($(".graph").css("width"),
	       $(".graph").css("padding"),
	       $(".graph").css("height"));
   });
   $('.gpaFirst').click(function () {
   $(".graph").remove();
   $(".whichSem").after("<svg class='graph'></svg>");
   graphGPAcum($(".graph").css("width"),
	       $(".graph").css("padding"),
	       $(".graph").css("height"));
   });
}


var numberCourses = function () {
 //this is where you query for how many courses each student is enrolled in
 //for now we're just generating a random number of classes
 var classes = parseInt($('.numClass').text());
 //creating tabs for each class on the nav bar
 for (var i = 0; i < classes; i++){
 $(".nav.navbar-nav").append("<li><a href=?user="+$('.user').text()+"&class="+i+">Class "+i+"</a></li>")
 }
}

var gradeRows = function () {
 //query the database for the final grades for each class and add row for each
 //for now we're again using a random number generator for number of classes
 var classes = Math.floor(Math.random()*10);
 //looping over to create as many rows as there are classes
 for (var i = 0; i < classes; i++){
  //we're going to use a random number for the grade and average as well
  var grade = Math.floor(Math.random()*100);
  var average = Math.floor(Math.random()*100);
  $("tbody").append("<tr><td>SomeClass</td><td>"+grade+"</td><td>"+average+"</td><td>A</td></tr>");
 }
 $("tbody").append('<tr><td colspan="4" style="background-color:white;"><div class="box predictedGPA">Predicted GPA: 3.76</div></td></tr>')
}

var selectOldTable = function (btn) {
 //get class
 var sem = btn.attr("class").split(' ')[1];
 // query for that semester in db and generate table based on that
 // for now just doing a random generation
 $(".tableContainer").append("<table class='table table-striped'><thead><th>Class</th><th>Score</th><th>Grade</th></thead><tbody></tbody></table>");
 var classes = Math.floor(Math.random()*10);
 for (var i = 0; i < classes; i++){
   var score = Math.floor(Math.random()*100);
  $("tbody").append("<tr><td>SomeClass</td><td>"+score+"</td><td>A</td></tr>");
 }
}

//creating graphs
var graphGPAcum = function (w,p,h) {
 h = parseInt(h);
 w = parseInt(w);
 p = parseInt(p);
 var svg = d3.select("svg");
 //w is the width of the svg and p is the padding h is height
 var dataset = [[1,3.5],[2,3.4],[3,3.8],[4,3.6],[5,3.1],[6,4.0],[7,3.0],[8,3.8]]
 //returns the maximum x value in the dataset
 var xmaxi = d3.max(dataset,function (subarr) {return subarr[0]});
 var rw = w/(xmaxi+7);
 var yscalecalc = d3.scale.linear().domain([0,4.0]).range([p,h-3*p]).clamp(true); // a seperate one for calculating heights, because the reversal below filps calcs.
 //I have no idea why the above works with h - three times the padding and not 2 time, like everything else does.
 var yscale = d3.scale.linear().domain([0,4.0]).range([h-2*p,p]).clamp(true); //reverse the mapped values because the co-ordinate system has origin at top left not bottom left; this is the one that will be displayed. 
 var xscale = d3.scale.linear().domain([0,xmaxi+1]).range([p,w-1.5*p]).clamp(true); 
 //creating axes:
 var xaxis = d3.svg.axis().scale(xscale).orient("bottom");
 var yaxis = d3.svg.axis().scale(yscale).orient("left"); 
 svg.selectAll("rect")
 .data(dataset)
 .enter()
 .append("rect")
 .attr("x",function (d) { return xscale(d[0]) -(rw/2);})
 .attr("y", function (d) {return h -3.5*p - yscalecalc(d[1]);})
 .attr("height",function (d) { return yscalecalc(d[1]);})
 .attr("width",rw)
 .attr("fill", function(d,i) {return "rgba(0, 0, 0, " + ((i + 2) / 10) + " )";});
 //calling the axes functions to generate the axes
 //call has to have a selection of DOM elements to call the function in
 console.log(h);
 console.log(p);
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - (3.5*p)) + ")").call(xaxis); 
 svg.append("g").attr("class","axis").attr("transform", "translate(" +p+ ",-"+1.5*p+")").call(yaxis); 
}

var graphGrade = function (w,p,h) {
 h = parseInt(h);
 w = parseInt(w);
 p = parseInt(p);
 var svg = d3.select('svg');
 var myscores = [[0,50],[1,80],[2,78],[3,86],[4,89],[5,78],[6,78],[7,89],[8,79]];
 var avscores = [[0,23],[1,43],[2,67],[3,36],[4,79],[5,76],[6,88],[7,98],[8,39]];
 var xmaxi = d3.max(myscores,function (subarr) {return subarr[0]});
 var xavmaxi = d3.max(avscores,function (subarr) {return subarr[0]});
 var yscale = d3.scale.linear().domain([0,100]).range([h-(3.5*p),p]).clamp(true);
 var xscale = d3.scale.linear().domain([0,xmaxi]).range([p,w-(3.5*p)]).clamp(true);
 var xaxis = d3.svg.axis().scale(xscale).orient("bottom");
 var yaxis = d3.svg.axis().scale(yscale).orient("left");
 var mylin = d3.svg.line()
  .x(function (d) {return xscale(d[0]);})
  .y(function(d) {return yscale(d[1]);})
  .interpolate("basis");
 var avlin = d3.svg.line()
  .x(function (d) {return xscale(d[0]);})
  .y(function (d) {return yscale(d[1]);})
  .interpolate('basis');
 svg.append('path').attr('d',mylin(myscores)).attr('stroke', 'black').attr('stroke-width', 2).attr('fill', 'none');//passing the dataset into the mylin instance 
 //will allow it to create the svg path attribute in the correct format
 svg.append('path').attr('d',avlin(avscores)).attr('stroke', 'grey').attr('stroke-width', 2).attr('fill', 'none');
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - 3.5*p) + ")").call(xaxis); 
 svg.append("g").attr("class","axis").attr("transform", "translate(" +p+ ",0)").call(yaxis);
 var rec = svg.append("svg").attr("x",0).attr("y",0).attr("height",h/5).attr("width",w/3);
 rec.append("circle").attr("fill","black").attr("cx",2*p).attr("cy",2*p).attr("r",5);
 rec.append("text").text("Your score").attr('x', 2.5*p).attr('y', 2*p);
 rec.append("circle").attr("fill","grey").attr("cx",2*p).attr("cy",3*p).attr("r",5);
 rec.append("text").text("Average score").attr('x', 2.5*p).attr('y', 3*p);
 }

//IMPORTANT: FOR SOME REASON, THE GRAPHS WILL ONLY SCALE IF THE X-AXIS IS h-3.5*p (SO YOU HAVE TO CHANGE THE Y-RANGE AS WELL) 

var graphGPA = function (w,p,h) {
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
 svg.append("g").attr("class","axis").attr("transform", "translate(0," + (h - 3.5*p) + ")").call(xaxis); 
 svg.append("g").attr("class","axis").attr("transform", "translate(" +p+ ",0)").call(yaxis);
}
