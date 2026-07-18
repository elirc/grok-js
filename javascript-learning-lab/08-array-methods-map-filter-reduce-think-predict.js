/*
THINK-PREDICT: map, filter, reduce
*/
let prices = [2, 5, 10];
let doubled = prices.map(p => p * 2);
console.log(doubled);

let expensive = prices.filter(p => p > 4);
console.log(expensive.length);

let sum = prices.reduce((a, b) => a + b, 0);
console.log(sum);

/*
PREDICT what reduce does without initial value on empty array.
*/