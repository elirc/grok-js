/*
Example: Mutability and Object References in JavaScript

Understanding how primitives and objects behave when assigned to variables is fundamental.
*/

let score = 100;
let highScore = score;
highScore = 250;

console.log("Original score:", score); // still 100

const player = { name: "Alex", score: 100 };
const playerRef = player;
playerRef.score = 250;

console.log("Player score after ref change:", player.score); // 250 now

const safeCopy = { ...player, score: 300 };
console.log("Safe copy score:", safeCopy.score);
console.log("Original player score unchanged:", player.score);

/*
Let's walk through what is actually happening in memory. When we write let score = 100 we create a primitive number value and bind the name "score" to it. Then highScore = score copies the primitive value itself. Changing highScore later has zero effect on score because the two names point to independent copies of the number. This is called "pass by value" for primitives.

When we create the player object and then do const playerRef = player we are not copying the object. We are copying the reference (the address in memory). Both names now refer to exactly the same object on the heap. Therefore when we mutate playerRef.score we are mutating the single shared object that player also points to. This is why the console.log shows 250 for the original player.

The spread syntax { ...player, score: 300 } creates a brand new object. It shallow-copies the enumerable own properties from player into a fresh object literal. Because it is a new object, changing safeCopy has no impact on player. A junior engineer should develop the habit of asking "do I need a new object or am I okay sharing the reference?" every time they assign an object or array to another variable.

This mental model explains the vast majority of "why did my data change unexpectedly" bugs in JavaScript applications, especially in React state updates and Redux reducers.
*/
