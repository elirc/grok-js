/*
NARRATIVE: Booleans — SnackTrack permissions
*/

let isPremium = false;
let snacksLogged = 12;

let canSeeReport = isPremium || snacksLogged > 10;
console.log("Can see weekly report?", canSeeReport);

console.log("Story teaches: booleans control what the user is allowed to see and do.");