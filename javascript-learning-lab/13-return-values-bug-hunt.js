/*
BUG HUNT: Return Values
*/

function getTotal(prices) {
  prices.forEach(p => { /* no return from forEach */ });
  // result undefined
}

const total = [1,2].map(x => { x*2 }); // forgot return inside block
console.log(total); // [undefined...]
console.log("Map callbacks and implicit vs explicit return are common sources of bugs");