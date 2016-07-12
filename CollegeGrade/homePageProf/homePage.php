<!DOCTYPE html>
<html lang='en'>
 <head>
  <title>Home Page</title>
  <!--IE compatibility-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
 
  <!--loading jquery-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

  <!--load d3-->
  <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

  <!--making bootstrap mobile friendly-->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!--loading css-->
  <link rel="stylesheet" type="text/css" href="homePageCSS.css"/>

  <!--loading javascript files -->
   <script src="jsFunctions.js"></script>
   <script>
    $(document).ready(function () {
     main();
    });
  </script>
  <?php
   include "queries.php";
  ?>
 </head>
 <body>
  <div class='mask'></div>
  <nav class="navbar navbar-inverse">
   <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="homePage.html">CollegeGrade</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="?class=1">Class 1</a></li>
    </ul>
   </div>
  </nav>
  <div class="tableContainer">
  <form name='assignmentGrades' method='post'>
   <table class="table table-striped"> 
    <thead>
    </thead>
    <tbody>
    </tbody>
   </table>
  </form>
 </div>
 <div class="addGradesDiv">
  <button type="button" class="btn btn-secondary addGradesBtn">Add Grades</button></th>
 </div>
 <svg class="graph">
 </svg>
 </body>
 
</html>
