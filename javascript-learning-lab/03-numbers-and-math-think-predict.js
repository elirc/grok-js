/*
THINK-PREDICT: Numbers and Math
*/

console.log("=== NUMBERS THINK & PREDICT ===\n");

// PREDICT
let a = 10;
let b = 3;
console.log(a / b);
console.log(Math.floor(a / b));
console.log(a % b);

/*
PREDICT: What is 0.1 + 0.2 === 0.3 ?
*/
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

/*
Floating point surprise. Never use === for money.
Use toFixed or proper decimal lib in real apps.
*/

let price = 9.99;
let qty = 3;
console.log((price * qty).toFixed(2));

console.log("End numbers predict");