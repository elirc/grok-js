/*
BEGINNER GOAL:
Learn how to make buttons and elements respond to user clicks using JavaScript event listeners.

REAL WORLD USE CASE:
- "Add to Cart" buttons
- "Submit" buttons on forms
- "Like" and "Comment" buttons
- Toggle menus and modals
- Any interactive part of a website

CONCEPTS COVERED:
- addEventListener
- The "click" event
- Anonymous functions as event handlers
- Arrow functions as event handlers
- Accessing the element that was clicked
- Removing event listeners (basic)
*/

// NOTE: These examples need to run in a browser with actual HTML elements.

// ============================================
// STEP 1: Selecting a button and listening for clicks
// ============================================

// Assume HTML has: <button id="my-btn">Click Me</button>

let myButton = document.querySelector("#my-btn");

if (myButton) {
  myButton.addEventListener("click", function() {
    console.log("The button was clicked!");
  });
}

// ============================================
// STEP 2: Using an arrow function (most common style)
// ============================================

let greetButton = document.querySelector("#greet-btn");

greetButton.addEventListener("click", () => {
  console.log("Hello from the arrow function handler!");
});

// ============================================
// STEP 3: Changing the page when clicked
// ============================================

let changeTextBtn = document.querySelector("#change-text");

changeTextBtn.addEventListener("click", () => {
  let heading = document.querySelector("h1");
  if (heading) {
    heading.textContent = "You clicked the button!";
  }
});

// ============================================
// STEP 4: Counting clicks
// ============================================

let counter = 0;
let countBtn = document.querySelector("#count-btn");
let countDisplay = document.querySelector("#count-display");

countBtn.addEventListener("click", () => {
  counter = counter + 1;
  if (countDisplay) {
    countDisplay.textContent = "Clicked " + counter + " times";
  }
});

// ============================================
// STEP 5: Reading which element was clicked
// ============================================

let listItems = document.querySelectorAll(".list-item");

listItems.forEach(item => {
  item.addEventListener("click", (event) => {
    // event.target is the actual element the user clicked
    console.log("You clicked on:", event.target.textContent);
  });
});

// ============================================
// STEP 6: A simple toggle example
// ============================================

let toggleBtn = document.querySelector("#toggle-btn");
let box = document.querySelector("#box");

toggleBtn.addEventListener("click", () => {
  if (box) {
    // classList.toggle adds the class if missing, removes it if present
    box.classList.toggle("hidden");
  }
});

// ============================================
// STEP 7: Removing an event listener
// ============================================

function handleClick() {
  console.log("This will only run once");
  // After running, remove the listener
  myButton.removeEventListener("click", handleClick);
}

if (myButton) {
  myButton.addEventListener("click", handleClick);
}

/*
LINE-BY-LINE BREAKDOWN:

myButton.addEventListener("click", function() { ... })
- addEventListener is a method on DOM elements
- First argument is the event type as a string ("click")
- Second argument is the callback function that will run when the event happens

() => { ... }
- We pass an arrow function as the handler
- This function will be called by the browser when the user clicks

heading.textContent = "..."
- Inside the click handler we can change the page
- This is how we make things interactive

event.target
- When the browser calls your handler, it passes an event object
- event.target is a reference to the element that was actually clicked
- Very useful when you have many similar elements

box.classList.toggle("hidden")
- classList gives you methods to work with CSS classes
- toggle is one of the most commonly used

NOOB TRANSLATION:

addEventListener means:
"Hey browser, when the user does this specific action on this element,
please run this function I gave you."

You are not running the function yourself.
You are giving the browser a callback and saying "call this later when the click happens."

COMMON MISTAKES:

1. Calling the function immediately instead of passing it
   - button.addEventListener("click", doThing()) ← wrong
   - button.addEventListener("click", doThing)   ← correct (or use arrow)

2. Selecting the element before it exists in the HTML (timing issues)

3. Adding the same listener multiple times by accident

4. Forgetting to check if the element exists before adding the listener

5. Trying to use this inside arrow functions the same way as regular functions (different behavior)

TRY CHANGING THIS:

1. Add a click listener to a button that logs "Button clicked!" every time.

2. Make a button that changes the background color of the page when clicked.

3. Add listeners to multiple list items so that clicking any of them logs its text.

MINI CHALLENGE:

Create the following:
- A button with text "Add Item"
- An empty <ul> with id "items"

When the button is clicked:
- Add a new <li> with the text "New item" to the list

Use querySelector and addEventListener.
*/