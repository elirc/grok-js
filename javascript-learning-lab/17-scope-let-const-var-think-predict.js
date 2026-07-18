/*
THINK-PREDICT: Scope
*/
let x = 1;
{
  let x = 2;
  console.log("inner", x);
}
console.log("outer", x);

/*
PREDICT var hoisting behavior vs let.
*/
var y = 10;
console.log(y);
