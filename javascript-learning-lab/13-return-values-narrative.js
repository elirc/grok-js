/*
NARRATIVE: Returning useful data
*/
function calculateDailyTotal(entries) {
  return entries.reduce((sum, e) => sum + e.price, 0);
}
console.log("Today's spend:", calculateDailyTotal([{price:2},{price:3}]));
console.log("Functions that return values let other parts of the story compose easily.");
