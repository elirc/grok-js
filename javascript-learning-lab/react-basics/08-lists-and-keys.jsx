/*
BEGINNER GOAL:
Learn how to render lists of data in React and why the "key" prop is important.

REAL WORLD USE CASE:
- Product listings
- Todo items
- Comments
- User lists
- Almost any repeated UI element

CONCEPTS COVERED:
- Using .map() to render lists
- The key prop
- Why keys help React
- Common patterns for list rendering
*/

// ============================================
// STEP 1: Rendering a list with map
// ============================================

function FruitList() {
  const fruits = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}

// ============================================
// STEP 2: The importance of the key prop
// ============================================

function TodoList() {
  const todos = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build something" },
    { id: 3, text: "Practice every day" }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// The key prop helps React know which items changed, were added, or removed.

// ============================================
// STEP 3: Using index as key (and why it's usually bad)
// ============================================

function BadKeyExample() {
  const items = ["one", "two", "three"];

  return items.map((item, index) => (
    <div key={index}>{item}</div>   // Only okay if the list never changes order
  ));
}

/*
LINE-BY-LINE BREAKDOWN:

fruits.map(fruit => <li>{fruit}</li>)
- We use the array map method (which you learned in JavaScript)
- For every item, we return a piece of JSX

key={todo.id}
- key is a special prop React uses internally
- It should be a unique and stable identifier for each item
- Best practice: use database IDs when possible

map returns a new array of JSX elements

NOOB TRANSLATION:

When you have a list of things, you usually want to show each one on the screen.

.map() is the tool that turns an array of data into an array of UI pieces.

The key prop is React's way of keeping track of each item when the list changes.

COMMON MISTAKES:

1. Forgetting the key prop entirely (React will warn you)

2. Using array index as key when items can be added, removed, or reordered

3. Not using unique keys when the list is dynamic

TRY CHANGING THIS:

1. Create an array of objects and render them as a list.

2. Add a unique id to each item and use it as the key.

3. Try removing the key and see if React complains in the console.

MINI CHALLENGE:

You have an array of users, each with id, name, and age.
Render them in a list showing "Name (Age)".
Use proper keys.
*/