/*
THINK-PREDICT: Return Values
*/
function double(n) { return n * 2; }
console.log(double(5));

function logAndReturn(x) {
  console.log("got", x);
  return x + 1;
}
let r = logAndReturn(10);
console.log(r);

/*
PREDICT what happens if you forget return in a map callback.
*/
