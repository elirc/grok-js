/*
BEGINNER GOAL:
Learn how to create React components — the fundamental building blocks of any React application.

REAL WORLD USE CASE:
Every screen in a React app is built by combining many components.
Learning to break UI into components is one of the most important skills in React.

CONCEPTS COVERED:
- Function components (the modern standard)
- What a component must return
- Naming conventions for components
- Reusability
- Composition
*/

// ============================================
// STEP 1: A basic component
// ============================================

function HelloWorld() {
  return <h1>Hello World</h1>;
}

// This is a React component.
// It is just a function that returns JSX.

// ============================================
// STEP 2: Components should be capitalized
// ============================================

// Wrong (React will think it's an HTML tag):
// function button() { return <button>Click</button>; }

// Correct:
function MyButton() {
  return <button>Click Me</button>;
}

// React uses capitalization to tell the difference between
// HTML elements (lowercase) and your components (uppercase).

// ============================================
// STEP 3: Making components reusable
// ============================================

function UserCard() {
  return (
    <div className="card">
      <h2>Alex Rivera</h2>
      <p>Software Developer</p>
    </div>
  );
}

// Problem: This component is not reusable. The name is hardcoded.

// Better version (we'll learn props next):
// function UserCard(props) {
//   return (
//     <div className="card">
//       <h2>{props.name}</h2>
//       <p>{props.role}</p>
//     </div>
//   );
// }

// ============================================
// STEP 4: Composing components
// ============================================

function App() {
  return (
    <div>
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
}

// You can use your own components inside other components.
// This is called composition.

/*
LINE-BY-LINE BREAKDOWN:

function HelloWorld() {
- We define a function
- The name starts with a capital letter
- This tells React it is a component, not a regular function

return <h1>Hello World</h1>;
- Every component must return something that React can render (usually JSX)

function MyButton()
- Capital B tells React this is our custom component

<UserCard />
- We are using the component we defined
- Note the self-closing tag and capital letter

NOOB TRANSLATION:

A component is a function that describes a piece of UI.

Instead of writing one giant HTML file, you create many small functions that each describe one part of the screen.

Then you combine those functions together like building with blocks.

COMMON MISTAKES:

1. Naming components with lowercase letters

2. Forgetting that components must return JSX (or null)

3. Creating one giant component instead of breaking things into smaller pieces

4. Trying to use a component without capitalizing it

TRY CHANGING THIS:

1. Create a component called Footer that returns a simple footer with some text.

2. Create two different components and put both of them inside a parent component.

3. Rename a component to start with lowercase and think about what would happen.

MINI CHALLENGE:

Create three components:
- Navbar
- MainContent
- Sidebar

Then create a Page component that puts all three together.
*/