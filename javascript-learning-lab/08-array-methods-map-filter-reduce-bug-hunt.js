/*
BUG HUNT: map/filter/reduce
*/

let nums = [1,2,3];
let result = nums.map(x => { x * 2 }); // missing return
console.log(result); // [undefined, ...]

let sum = nums.reduce((acc, n) => acc + n); // works but be careful on empty

console.log("Forgot return in map is extremely common");