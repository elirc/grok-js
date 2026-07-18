/*
BUG HUNT: Arrays
*/

let list = ["a", "b"];
let item = list.pop();
console.log(list); // expect? 

// Off-by-one common
for (let i = 0; i <= list.length; i++) {
  console.log(list[i]); // undefined at end
}

console.log("Array bugs often involve mutation + index errors");