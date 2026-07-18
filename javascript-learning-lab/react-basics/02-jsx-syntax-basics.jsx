/*
BEGINNER GOAL:
Learn JSX syntax — the special way we write UI inside JavaScript when using React.

REAL WORLD USE CASE:
Every React component you will ever write uses JSX (or its cousin TSX).
Understanding JSX is fundamental to reading and writing React code.

CONCEPTS COVERED:
- What JSX is
- How JSX is similar to (but not the same as) HTML
- Embedding JavaScript expressions with {}
- JSX rules (must have one parent element, proper closing tags, etc.)
- className instead of class
*/

// ============================================
// STEP 1: Basic JSX
// ============================================

function SimpleHeading() {
  return <h1>Hello from React!</h1>;
}

// This looks like HTML but it is actually JavaScript under the hood.

// ============================================
// STEP 2: Embedding JavaScript with curly braces
// ============================================

function Greeting() {
  const name = "Alex";
  const hour = new Date().getHours();

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>It is currently hour {hour}.</p>
    </div>
  );
}

// {name} and {hour} are JavaScript expressions being inserted into the UI.

// ============================================
// STEP 3: Important differences from HTML
// ============================================

function FormExample() {
  return (
    <div>
      {/* class becomes className */}
      <input type="text" className="form-input" />

      {/* All tags must be closed */}
      <img src="photo.jpg" alt="My photo" />

      {/* Comments in JSX use this syntax */}
      {/* This is a comment */}
    </div>
  );
}

// ============================================
// STEP 4: JSX must return a single parent element
// ============================================

function BadExample() {
  // This would be an error:
  // return <h1>Title</h1> <p>Text</p>;

  // Correct way:
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );

  // Modern alternative (React 16.8+): React Fragment
  // return (
  //   <>
  //     <h1>Title</h1>
  //     <p>Text</p>
  //   </>
  // );
}

/*
LINE-BY-LINE BREAKDOWN:

const name = "Alex";
- Regular JavaScript variable

<h1>Hello, {name}!</h1>
- The curly braces {} tell React: "run this JavaScript and put the result here"
- This is how we mix data into our UI

className="form-input"
- In JSX we cannot use the word "class" because it is a reserved word in JavaScript
- So React uses className instead

{/* comments */}
- Special comment syntax inside JSX

NOOB TRANSLATION:

JSX lets you write what looks like HTML, but inside your JavaScript file.

The curly braces are the secret door:
Anything inside {} is regular JavaScript that will be evaluated.

This is extremely powerful because you can use variables, math, function calls, etc. directly inside your UI description.

COMMON MISTAKES:

1. Using "class" instead of "className"

2. Forgetting to close self-closing tags like <img> or <input>

3. Returning multiple elements without wrapping them in a parent or fragment

4. Writing JavaScript logic outside of {} and expecting it to work inside JSX

TRY CHANGING THIS:

1. Create a component that displays your name using a variable inside {}.

2. Make a component that shows the result of 5 + 7 using JSX.

3. Build a small JSX structure with a heading, paragraph, and an input field.

MINI CHALLENGE:

Create a component called ProfileCard that returns JSX containing:
- A heading with the user's name (use a variable)
- A paragraph that says "Age: X" (use a variable)
- An image tag (use a placeholder URL)
*/