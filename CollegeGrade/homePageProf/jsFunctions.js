var main = function () {
 $(".addGradesBtn").click(function () {
 $('table').prepend('<tr class="addGrades"><td colspan=2><form>Assignment Name <input type="text" name="addGrades"><input name="submitAssign" type="submit" value="Submit"></form></td><tr>')
 });
 $("input[name=submitAssign]").click(function (){
 $('.addGrades').remove();
 //here we would query the class and generate a table of all student's names, but for now random data
 assignGrades();
 });
}

var assignGrades = function () {
 //query the database for the final grades for each class and add row for each
 //for now we're again using a random number generator for number of classes
 var students = Math.floor(Math.random()*10);
 //looping over to create as many rows as there are classes
 for (var i = 0; i < students; i++){
  //we're going to use a random number for the grade and average as well
  $("tbody").append("<tr><td>SomeStudent</td><td><input type='text' name='score'></td><td></tr>");
 }
 $("tbody").append('<tr><td colspan="4" style="background-color:white;"><button type="button" class="btn btn-secondary submitGrades">Submit Grades</button></td></tr>')
}

//$("tbody").append('<tr><td colspan="4" style="background-color:white;"><div class="box avScore">Average: 88</div></td></tr>')
