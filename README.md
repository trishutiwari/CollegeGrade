# CollegeGrade
A webapp that lets you graphically visualize grades

Motivation:
Nowdays, a lot of colleges now use web-applications to keep track of grades. However, there are a few structural flaws
with them. 
Firstly, from my experience, students find it extremely frustrating when they do not have knowledge of what their grade is until the very
end of the class. They feel that by the time they get to know how they've done (i.e., their grade), the class has ended and it is too late 
to do anything about it.
Secondly, most of these apps do not let students know how well they're doing. They only display the student's aggregate marks, and
often omit the class average, standard deviation, and other statistics. This keeps the student unaware of the quality of his/her 
performance. Frequently, the only time the student gets to know these stats are when the class ends, by which time it is too late
to take any action.
Even if they do allow these statistics to be published, most often the professor would have to himself/herself compute these numbers and
then enter them. This makes it painful for the professor to do this for every assignment, and hence acts as a deterrent.
Lastly, almost all platforms offer no real-time graphical visualization of the student's grades. It is then difficult for 
a) student's to monitor trends in their performance
b) professors to monitor trends in the class's performance

This app solves all these problems. Its algorithms compute the class average and standard deviation for every assignment entered by the
professor (so it eliminates the professor's need to do so himself). It also includes a graph of the student's score and class average
vs. time on the same plot to allow easy visual comparison, thereby allowing the student to easily monitor his performace. The student can
also set a minimum / goal score on the graph, which will allow him to see if he's meeting his expectations without involving any computation.
It also includes a grade prediction algorithm, which gives the student an estimate of his final grade based on his current performance. 
