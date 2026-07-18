/*
BEGINNER GOAL:
Build a tiny in-memory todo list using everything we've learned so far.
This combines arrays, objects, functions, loops, DOM selection, and events.

REAL WORLD USE CASE:
Todo lists are classic beginner projects because they use almost every basic concept:
- Storing data in arrays of objects
- Adding and removing items
- Rendering a list to the page
- Handling user input
- Updating the UI after changes

CONCEPTS COVERED:
- Storing todos in an array
- Adding new todos
- Deleting todos
- Marking todos as complete
- Rendering the list from data
- Connecting UI events to data changes
*/

// ============================================
// DATA
// ============================================

// This array is the single source of truth for our todos
let todos = [
  { id: 1, text: "Learn JavaScript basics", completed: false },
  { id: 2, text: "Practice array methods", completed: true }
];

// ============================================
// RENDER FUNCTION
// ============================================

function renderTodos() {
  let list = document.querySelector("#todo-list");
  if (!list) return;

  // Clear the current list
  list.innerHTML = "";

  // Create a list item for every todo
  todos.forEach(todo => {
    let li = document.createElement("li");

    // Show different text if completed
    if (todo.completed) {
      li.textContent = "✓ " + todo.text;
      li.style.textDecoration = "line-through";
    } else {
      li.textContent = todo.text;
    }

    // Add a delete button for each todo
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    li.appendChild(deleteBtn);

    // Clicking the text toggles completed status
    li.addEventListener("click", () => {
      toggleTodo(todo.id);
    });

    list.appendChild(li);
  });
}

// ============================================
// ADD NEW TODO
// ============================================

function addTodo(text) {
  if (!text || text.trim() === "") {
    return; // don't add empty todos
  }

  let newTodo = {
    id: Date.now(), // simple unique id
    text: text.trim(),
    completed: false
  };

  todos.push(newTodo);
  renderTodos();
}

// ============================================
// DELETE A TODO
// ============================================

function deleteTodo(id) {
  // Keep only the todos whose id is different from the one we want to delete
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// ============================================
// TOGGLE COMPLETED STATUS
// ============================================

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      // Flip the completed value
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  renderTodos();
}

// ============================================
// SETUP
// ============================================

function setupTodoApp() {
  let input = document.querySelector("#todo-input");
  let addBtn = document.querySelector("#add-todo-btn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (input) {
        addTodo(input.value);
        input.value = ""; // clear the input
      }
    });
  }

  // Also allow pressing Enter in the input
  if (input) {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        if (addBtn) addBtn.click();
      }
    });
  }

  // Initial render
  renderTodos();
}

// Run setup when this script loads
// In a real page, make sure the DOM elements exist first
setupTodoApp();

/*
LINE-BY-LINE BREAKDOWN:

let todos = [...]
- We keep all our data in one array of objects
- Each todo has id, text, and completed

todos.forEach(todo => { ... })
- We loop through the data and create DOM elements for each one

let li = document.createElement("li");
- Instead of writing HTML strings, we create real elements

deleteBtn.addEventListener("click", () => { deleteTodo(todo.id); })
- Each delete button remembers which todo it belongs to using the id

todos = todos.filter(todo => todo.id !== id)
- We create a new array that excludes the todo we want to remove
- Then we re-assign todos and re-render

todos.map(...)
- We create a new array with one todo updated
- We use spread to copy the old properties and only change completed

renderTodos()
- We call this after every change so the screen always matches the data

NOOB TRANSLATION:

This pattern is called "data drives the UI":
1. Your data lives in a JavaScript array
2. When anything changes, you update the array
3. Then you completely re-draw the list from the current data
4. The user only sees the result of the latest data

This is a simplified version of how many real apps work.

COMMON MISTAKES:

1. Trying to keep state only in the DOM (hard to manage)
2. Forgetting to re-render after changing data
3. Using the same id for multiple todos
4. Mutating the array while rendering it
5. Not trimming input before adding

TRY CHANGING THIS:

1. Add a counter that shows how many todos are left to do.

2. Add a button to clear all completed todos.

3. Make it so double-clicking a todo lets you edit the text (harder challenge).

MINI CHALLENGE:

Add a "Clear All" button that empties the entire todos array and re-renders the list.
*/