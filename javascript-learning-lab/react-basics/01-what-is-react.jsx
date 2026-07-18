/*
BEGINNER GOAL:
Understand what React is at a high level and why developers use it instead of vanilla JavaScript for building user interfaces.

REAL WORLD USE CASE:
React is used by millions of websites and apps including:
- Facebook, Instagram, Netflix, Airbnb, Uber, etc.
- Most modern job postings for frontend developers mention React.
- It helps manage complex UIs that change over time.

CONCEPTS COVERED:
- What React is
- The idea of components
- Declarative vs imperative programming
- Virtual DOM (high level)
- Why we write UI as functions/components instead of manually editing the DOM
*/

// ============================================
// STEP 1: What problem does React solve?
// ============================================

// In vanilla JavaScript (what you learned earlier):
// You manually select elements with querySelector
// You manually change textContent, innerHTML, classes, etc.
// For complex apps this becomes messy very fast.

// Example of the old way:
const heading = document.querySelector("#title");
heading.textContent = "Welcome back, Alex!";
heading.style.color = "blue";

// You have to keep track of everything yourself.

// ============================================
// STEP 2: React's main idea - Components
// ============================================

// React lets you build your UI using small, reusable pieces called components.

// A component is like a custom HTML element that you define yourself.

function WelcomeMessage(props) {
  // This function describes what the UI should look like
  return <h1>Welcome back, {props.name}!</h1>;
}

// Later you can use it like this (in JSX):
// <WelcomeMessage name="Alex" />

// ============================================
// STEP 3: Declarative UI
// ============================================

// Vanilla JS is imperative:
// "Find this element, then change its text, then add a class..."

// React is declarative:
// "The heading should show this text based on the user's name."

// You describe what you want the UI to be.
// React figures out how to update the actual DOM efficiently.

// ============================================
// STEP 4: Why components are powerful
// ============================================

// You can compose many small components into bigger ones.

// Example mental model:
// App
//   ├── Header
//   │     └── UserAvatar
//   ├── Sidebar
//   └── MainContent
//         ├── PostList
//         └── Post

// Each piece is responsible for one thing.
// This makes code easier to understand and reuse.

// ============================================
// STEP 5: React does not replace JavaScript
// ============================================

// Everything you learned about JavaScript still matters.
// React is a library built on top of JavaScript.
// You still use variables, functions, arrays, objects, conditionals, etc.
// React just gives you a better way to build and update the user interface.

/*
LINE-BY-LINE BREAKDOWN:

function WelcomeMessage(props) {
- This is a React component (a function that returns JSX)
- "props" contains the data passed into the component

return <h1>Welcome back, {props.name}!</h1>;
- Instead of creating elements with createElement or innerHTML,
  we write HTML-like syntax called JSX directly inside JavaScript

<WelcomeMessage name="Alex" />
- This is how we would use the component
- We are passing "Alex" as the name prop

NOOB TRANSLATION:

Think of React as a smart assistant for building web pages.

Instead of you telling the page "change this, now change that, now add this class",
you give React a description:
"When the user is logged in, show their name here."

React handles all the dirty work of actually updating the page.

Components are like Lego blocks for your user interface.

COMMON MISTAKES:

1. Thinking React is a completely different language
   - It's still JavaScript + JSX

2. Trying to use React without understanding basic JavaScript first

3. Manually editing the DOM inside React components (usually a bad idea)

4. Expecting to understand everything on day one — React has a learning curve

TRY CHANGING THIS:

1. In your mind, break down a simple webpage (like a todo app) into 4-5 components.

2. Write a function component called Greeting that returns a heading saying "Hello!".

3. Imagine how the old vanilla JS way of updating a list would compare to using components.

MINI CHALLENGE:

Write three different component functions on paper or in a comment:
- One called Header
- One called UserProfile
- One called Footer

For each, write what kind of content you think they would display.
*/