/*
BUG HUNT Scope
*/
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // prints 3,3,3 due to var
}
// fix with let

function bad() {
  console.log(z); // TDZ for let
  let z = 5;
}
console.log("var leaks + TDZ + closure over loop var are classic scope bugs");