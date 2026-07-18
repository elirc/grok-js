/*
NARRATIVE: Summarizing all logged snacks
*/
const history = [{price:2},{price:3}];
let sum = 0;
history.forEach(e => sum += e.price);
console.log("Looped total:", sum);
console.log("Iterating the history list is how SnackTrack shows reports.");
