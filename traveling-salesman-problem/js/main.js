var temp  = new Salesman(10);
temp.create();
var greedy = Object.create(temp);
var bruteForce = Object.create(temp);
greedy.run('greedy');
bruteForce.run('brute-force');