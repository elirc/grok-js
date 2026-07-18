/*
BUG HUNT: Numbers
*/

let total = 0.1 + 0.2;
if (total === 0.3) {
  console.log("Exact!");
} else {
  console.log("Not exact:", total);
}

// Lesson: use epsilon or toFixed for comparisons involving decimals

let score = "87";
console.log(score + 10); // "8710" — string concat bug
console.log(Number(score) + 10); // correct

console.log("Bug hunt numbers: watch types and floating point");