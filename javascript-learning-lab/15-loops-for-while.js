/*
BEGINNER GOAL:
Learn how to repeat code using loops.
Loops let you run the same block of code many times without writing it over and over.

REAL WORLD USE CASE:
- Going through every item in a shopping cart
- Displaying every message in a chat
- Checking every user in a list
- Running a countdown timer
- Repeating an action until a condition is met

CONCEPTS COVERED:
- for loops
- while loops
- do...while loops
- Loop variables (counter)
- break and continue
- When to use each type of loop
*/

// ============================================
// STEP 1: The basic for loop
// ============================================

// A for loop has three parts inside the parentheses:
// 1. Initialization (run once at the beginning)
// 2. Condition (checked before every repetition)
// 3. Final expression (run after every repetition)

for (let i = 0; i < 5; i++) {
  console.log("Counting:", i);
}

// Step by step:
// i = 0 → check 0 < 5 → true → run code → i++ (now i=1)
// i = 1 → check 1 < 5 → true → run code → i++ (now i=2)
// ... continues until i = 5 which fails the condition

// ============================================
// STEP 2: A more useful for loop
// ============================================

let colors = ["red", "green", "blue", "yellow"];

for (let i = 0; i < colors.length; i++) {
  // i goes from 0 to 3
  console.log("Color at index " + i + ":", colors[i]);
}

// ============================================
// STEP 3: while loop
// ============================================

// A while loop keeps running as long as the condition is true.

let count = 0;

while (count < 3) {
  console.log("While count:", count);
  count = count + 1;
}

// ============================================
// STEP 4: do...while loop (runs at least once)
// ============================================

let number = 10;

do {
  console.log("do...while ran with number:", number);
  number = number + 1;
} while (number < 10);

// Even though number is already 10, the code ran once before checking

// ============================================
// STEP 5: Using break to stop a loop early
// ============================================

let numbers = [1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 4) {
    console.log("Found 4! Stopping the loop.");
    break; // immediately exits the loop
  }
  console.log("Checking:", numbers[i]);
}

// ============================================
// STEP 6: Using continue to skip one iteration
// ============================================

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip the rest of this iteration
  }
  console.log("Odd number:", i);
}

// ============================================
// STEP 7: Real example - printing a shopping list
// ============================================

let cart = ["Laptop", "Mouse", "Headphones", "USB Cable"];

console.log("Your cart contains:");

for (let i = 0; i < cart.length; i++) {
  let item = cart[i];
  console.log((i + 1) + ". " + item);
}

// ============================================
// STEP 8: Countdown using while
// ============================================

let secondsLeft = 5;

while (secondsLeft > 0) {
  console.log("Time remaining:", secondsLeft);
  secondsLeft = secondsLeft - 1;
}

console.log("Time's up!");

/*
LINE-BY-LINE BREAKDOWN:

for (let i = 0; i < 5; i++) {
- let i = 0     → create counter starting at 0
- i < 5         → keep looping while this is true
- i++           → after each loop, add 1 to i

console.log("Counting:", i);
- This line runs once for each successful check of the condition
- i will be different each time

for (let i = 0; i < colors.length; i++)
- We use colors.length so the loop automatically adjusts if the array changes size
- This is a very common pattern

while (count < 3) {
- The condition is checked before every run
- If it's false on the first check, the loop body never runs

do { ... } while (condition);
- The body runs first, THEN the condition is checked
- Guarantees at least one execution

break;
- Immediately exits the entire loop
- Code after the loop will run next

continue;
- Skips the rest of the current iteration
- Goes back to the top of the loop for the next round

NOOB TRANSLATION:

A loop is like telling someone:
"Keep doing this action until I tell you to stop."

The for loop is the most common because it gives you:
- A starting point
- A stopping condition
- A way to move forward each time

while is simpler: "Keep going while this is true."

break is like saying "Stop everything right now!"
continue is like saying "Skip this one and move to the next."

COMMON MISTAKES:

1. Creating an infinite loop (forgetting to increase the counter)
   - while (true) {} with no way out

2. Off-by-one errors
   - Using <= when you should use < or vice versa

3. Using the wrong variable inside the loop
   - Accidentally using i after the loop ends

4. Modifying the array length while looping over it

5. Forgetting that continue and break only affect the nearest loop

TRY CHANGING THIS:

1. Write a for loop that prints the numbers 10 down to 1.

2. Use a while loop to keep adding 1 to a variable until it reaches 20. Print each step.

3. Loop through an array of names and print only the names that start with "A".

MINI CHALLENGE:

Create an array of 6 numbers.
Use a for loop to:
- Print each number
- Add up all the numbers
- Print the final sum at the end

Bonus: Use break to stop early if the sum goes over 100.
*/