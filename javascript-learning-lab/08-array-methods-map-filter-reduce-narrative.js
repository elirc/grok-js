/*
NARRATIVE: Calculating with SnackTrack data
*/
let entries = [{price:2.5}, {price:1.8}, {price:4}];
let totals = entries.map(e => e.price).reduce((a,b)=>a+b, 0);
let bigOnes = entries.filter(e => e.price > 2);
console.log("Total spent:", totals, "Big purchases:", bigOnes.length);
console.log("Declarative style makes the story logic easy to read.");