/*
THINK-PREDICT: Function Arguments
*/
function greet(name = "friend") {
  return "Hi " + name;
}
console.log(greet());
console.log(greet("Sam"));

function sum(...nums) { return nums.reduce((a,b)=>a+b,0); }
console.log(sum(1,2,3));
