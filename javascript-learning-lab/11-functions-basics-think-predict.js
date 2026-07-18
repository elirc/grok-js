/*
THINK-PREDICT: Functions Basics
*/

function greet(name) {
  return "Hi " + name;
}
console.log(greet("Alex"));

function add(a, b) { return a + b; }
console.log(add(2, 3));

/*
PREDICT: what is logged by a function that does not return?
*/
function noReturn() { console.log("side effect"); }
console.log(noReturn());
