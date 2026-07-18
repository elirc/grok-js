/*
BEGINNER GOAL:
Learn how to select elements from an HTML page using JavaScript.
This is the first step to making web pages interactive.

REAL WORLD USE CASE:
- Getting a button so you can listen for clicks
- Reading the text inside a paragraph
- Finding all the items in a list
- Changing the content of a heading
- Grabbing form inputs to read their values

CONCEPTS COVERED:
- document.querySelector
- document.querySelectorAll
- CSS selectors in JavaScript
- What a DOM element is
- Storing selected elements in variables
- The difference between querySelector and querySelectorAll
*/

// NOTE:
// These examples are meant to be run in a browser.
// You can either:
// 1. Create a simple index.html and include this script
// 2. Paste pieces into the browser console on any page
// 3. Just read and understand the patterns

// ============================================
// STEP 1: Selecting a single element
// ============================================

// querySelector finds the first element that matches a CSS selector

// Select by tag name
let heading = document.querySelector("h1");
console.log(heading);

// Select by class (use . before the class name)
let container = document.querySelector(".container");

// Select by ID (use # before the id)
let mainContent = document.querySelector("#main");

// Select using more specific CSS
let firstButton = document.querySelector("button.primary");

// ============================================
// STEP 2: If nothing is found
// ============================================

let missing = document.querySelector(".does-not-exist");
console.log(missing); // null
// Always check before using if the element might not exist

// ============================================
// STEP 3: Selecting multiple elements
// ============================================

// querySelectorAll returns a NodeList (array-like) of all matches

let allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs.length);

let allCards = document.querySelectorAll(".card");

// You can loop over them
allCards.forEach(function(card) {
  console.log("Found a card:", card);
});

// ============================================
// STEP 4: Common selector patterns
// ============================================

// Tag + class
let submitBtn = document.querySelector("button.submit");

// Descendant selector
let navLinks = document.querySelectorAll("nav a");

// Attribute selector
let emailInput = document.querySelector('input[type="email"]');

// ============================================
// STEP 5: Reading information from elements
// ============================================

// Assume we have <h1 id="title">Welcome</h1>

let title = document.querySelector("#title");

if (title) {
  console.log("Text inside:", title.textContent);
  console.log("HTML inside:", title.innerHTML);
}

// ============================================
// STEP 6: Storing selections for later use
// ============================================

let usernameDisplay = document.querySelector("#username");
let logoutButton = document.querySelector("#logout-btn");

// Later in your code you can use these variables
// instead of selecting the elements again

/*
LINE-BY-LINE BREAKDOWN:

document.querySelector("h1")
- document is the entry point to the page's content
- querySelector is a method on document
- It takes a CSS selector as a string
- Returns the first matching element or null

document.querySelector(".container")
- The dot means "class" just like in CSS
- Finds the first element that has class="container"

document.querySelector("#main")
- The # means "id"
- Finds the element with id="main"

document.querySelectorAll("p")
- Returns ALL matching elements
- Returns a NodeList (you can use .forEach on it)
- Not a real array, but very similar

allCards.forEach(...)
- We can loop through the results of querySelectorAll
- Each "card" is an actual DOM element

title.textContent
- Gets the text inside an element (without HTML tags)
- There is also .innerHTML if you need the HTML

NOOB TRANSLATION:

The DOM is the live version of your HTML that JavaScript can see and touch.

querySelector is like using Ctrl+F on the page, but instead of searching for text, you're searching using CSS rules.

- "h1" = find the first heading
- ".card" = find something with class card
- "#user" = find the thing with id user

Once you have the element, you can read from it or change it later.

COMMON MISTAKES:

1. Forgetting the dot or hash in selectors
   - querySelector("container") looks for a <container> tag
   - querySelector(".container") looks for class container

2. Calling methods on null because the element wasn't found

3. Expecting querySelectorAll to return a real array (it returns a NodeList)

4. Selecting elements before the page has loaded (we'll learn about this later)

5. Using the same selector many times instead of storing the result

TRY CHANGING THIS:

1. Use querySelector to grab an element by its class and log its textContent.

2. Use querySelectorAll to select all <li> elements and print how many there are.

3. Select an element with an ID and try changing its textContent in the console.

MINI CHALLENGE:

Imagine an HTML page with:
- A heading with id="page-title"
- Three divs with class="product"

Write code that:
1. Selects the title and logs it
2. Selects all products and logs how many there are
3. Loops through the products and logs each one
*/