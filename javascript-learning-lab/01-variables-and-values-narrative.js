/*
NARRATIVE JOURNEY STYLE — Story / Contextual Project-Based
Topic: Variables and Values

DIFFERENT APPROACH:
You are not studying "variables" in a vacuum.
You are Alex, a person who decided to build a tiny personal app called "SnackTrack" to log what snacks you eat and how much they cost.

Every line of code exists because Alex needed it *right now* to make the app better.
The story makes the "why" obvious and memorable.
*/

console.log("=== NARRATIVE: Building SnackTrack — Chapter 1: Variables ===\n");

/*
THE STORY SO FAR:
Alex wants to stop mindlessly eating snacks and spending money.
They open their editor and think:
"I need the program to remember my name, today's snack, and how much it cost."

Without variables, every time Alex wanted to print a message they would have to hardcode the values.
That would be impossible to update later.
*/

console.log("--- Morning: Alex starts coding ---\n");

// Alex creates variables to remember the important things about themselves
let userName = "Alex Rivera";
let currentSnack = "spicy chips";
let snackPrice = 2.49;
let snacksToday = 1;

// Now Alex can use these values anywhere without repeating the literal data.
console.log("Welcome back to SnackTrack, " + userName + "!");
console.log("Your first snack today was " + currentSnack + " for $" + snackPrice);

/*
STORY MOMENT:
Alex eats another snack in the afternoon. They want to update the app.

If they had written the values directly in every console.log, they would need to find and change 5 places.
With variables they change ONE place.
*/

currentSnack = "chocolate bar";
snackPrice = 1.99;
snacksToday = snacksToday + 1;   // reusing the old value to compute the new one

console.log("Update: " + userName + " also ate " + currentSnack);
console.log("Total snacks logged today:", snacksToday);

/*
WHY WE NEEDED VARIABLES IN THE STORY:
- userName never changes in one session (good candidate for const actually)
- currentSnack and snackPrice change as Alex eats more
- snacksToday needs to be calculated from its previous value

Real apps are full of this pattern: "current user", "current total", "last updated time".
*/

console.log("\n--- Alex decides some values must never accidentally change ---\n");

// Alex learns about const for things that should stay stable
const APP_NAME = "SnackTrack";
const VERSION = "0.1-alpha";
// APP_NAME = "SomethingElse"; // This would be a bug in the story

console.log(APP_NAME + " v" + VERSION + " — keeping Alex accountable");

/*
STORY DECISION POINT:
Alex wants to also track a "budget" for the whole week.
They create a few more variables.
*/

let weeklyBudget = 15.00;
let spentSoFar = snackPrice * snacksToday;
let remaining = weeklyBudget - spentSoFar;

console.log("Budget left this week: $" + remaining.toFixed(2));

/*
NARRATIVE INSIGHT:
Variables are how Alex's program holds the current state of the "real world" (what Alex has eaten).
When Alex eats something, the variables must change to reflect reality.
This is the entire purpose of state in applications.
*/

/*
LATER THAT DAY — Alex shares the app with a friend
The friend points out a subtle bug waiting to happen.
*/

console.log("\n--- The friend points out a dangerous pattern ---\n");

let todaysLog = { snack: "chips", cost: 2.49 };
let backupLog = todaysLog;   // "just in case"

backupLog.cost = 0;   // friend was just testing...

console.log("Wait — the original todaysLog also changed!", todaysLog);

/*
ALEX'S REALIZATION (and yours):
Because objects are references, backupLog and todaysLog were the same box with two labels.
Changing one changed the data the other label pointed to.

Alex learns to make real copies when they need independent data.
*/

let safeCopy = { ...todaysLog };   // new object, same data
safeCopy.cost = 99;

console.log("Original still safe:", todaysLog.cost);
console.log("Crazy experiment copy:", safeCopy.cost);

/*
CHAPTER 1 COMPLETE — WHAT ALEX (AND YOU) LEARNED IN CONTEXT

- Variables let the program remember things that can change (let) or must not (const)
- Reassignment updates state — essential for any interactive app
- Objects and arrays are shared by reference — one of the most important mental models in JS
- Using named values instead of magic strings/numbers makes future changes cheap and safe
- All of this emerged naturally while building one tiny useful thing (SnackTrack)

Alex's next challenge (preview of next narrative file):
" I want to store multiple snacks in a list and calculate the total automatically... "
(That will be the arrays chapter.)

Try changing values in this file and re-running.
Imagine you are Alex building the next feature you personally want.
*/

console.log("\n=== End of SnackTrack Chapter 1: Variables ===");