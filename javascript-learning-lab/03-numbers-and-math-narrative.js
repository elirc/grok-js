/*
NARRATIVE: Numbers — SnackTrack
Alex calculates total calories and money spent.
*/

let chipsCals = 150;
let barCals = 220;
let totalCals = chipsCals + barCals;

let budget = 20;
let spent = 4.5 * 2;
console.log(`Spent $${spent.toFixed(2)}, ${((spent / budget) * 100).toFixed(0)}% of budget`);

console.log("Story: math turns raw counts into insight Alex can act on.");