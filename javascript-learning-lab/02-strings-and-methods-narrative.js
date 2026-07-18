/*
NARRATIVE: Strings — Building SnackTrack Chapter 2
Alex needs to clean up user-entered snack names and show nice formatted messages.
*/

let rawSnack = "   CHOCOLATE  bar  ";
let cleanSnack = rawSnack.trim().toLowerCase();
console.log(`Alex logged: "${cleanSnack}"`);

let display = `Snack: ${cleanSnack[0].toUpperCase() + cleanSnack.slice(1)}`;
console.log(display);

/*
Story teaches: real user input is always messy. trim, toLowerCase, template literals, slicing make it nice.
*/