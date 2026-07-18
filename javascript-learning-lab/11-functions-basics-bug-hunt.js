/*
BUG HUNT: Functions
*/

function calculate(x) {
  let result = x * 2;
  // forgot return
}
console.log(calculate(5)); // undefined

function outer() {
  let secret = 42;
  function inner() { return secret; }
  return inner;
}
let fn = outer();
console.log(fn()); // closure works

console.log("Common: forgetting return, misunderstanding what is returned");