/*
BEGINNER GOAL:
Learn how to pass data into components using props.

REAL WORLD USE CASE:
Props are how components communicate.
A parent component gives data to a child component through props.
This is fundamental to almost every React app.

CONCEPTS COVERED:
- What props are
- Passing props when using a component
- Receiving props inside the component function
- Using props inside JSX
- Props are read-only
*/

// ============================================
// STEP 1: Passing data with props
// ============================================

function Welcome(props) {
  // props is an object containing everything passed to the component
  return <h1>Hello, {props.name}!</h1>;
}

// When we use the component, we pass values as attributes:
function App() {
  return (
    <div>
      <Welcome name="Alex" />
      <Welcome name="Sam" />
    </div>
  );
}

// ============================================
// STEP 2: Multiple props
// ============================================

function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Location: {props.city}</p>
    </div>
  );
}

function MainApp() {
  return <UserProfile name="Jordan" age={29} city="Seattle" />;
}

// Note: numbers need curly braces: age={29} not age="29"

// ============================================
// STEP 3: Props are read-only
// ============================================

function BadComponent(props) {
  // props.name = "New Name";   // NEVER do this!
  // Props are meant to be received, not changed.

  return <h1>{props.name}</h1>;
}

// If you need to change data, use state (we'll learn that next).

/*
LINE-BY-LINE BREAKDOWN:

function Welcome(props) {
- The function receives one argument called props
- props is always an object

<Welcome name="Alex" />
- We pass "Alex" as the value of the "name" property
- Inside the component, this becomes props.name

{props.name}
- We use the value inside JSX using curly braces

age={29}
- When passing numbers, booleans, or objects, use curly braces
- Without curly braces, React would treat it as the string "29"

NOOB TRANSLATION:

Props are like arguments you pass to a function — but for UI.

When you write:
<Welcome name="Alex" />

You are saying:
"Create a Welcome component and give it the name Alex."

The component can then use that information to decide what to show.

Props flow from parent to child. They are read-only.

COMMON MISTAKES:

1. Forgetting curly braces when passing non-string values

2. Trying to modify props inside the child component

3. Confusing props with state

4. Naming props inconsistently between parent and child

TRY CHANGING THIS:

1. Create a component called Product that receives name and price as props.

2. Make a list of three Product components with different data.

3. Pass a number prop and display it inside the component.

MINI CHALLENGE:

Create a component called AnimalCard that accepts:
- animalName (string)
- species (string)
- age (number)

Display them nicely. Then use the component three times with different animals.
*/