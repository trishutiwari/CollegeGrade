<?php 
//instead of generating random number of classes, we're going to query mysql.
 function numClasses () {
 //something like count() classes for user = $user; and store this number in $num
 $num = rand(0,10);
 echo "<div class='numClass' style='display:none'>".$num."</div>";
 }
?>
