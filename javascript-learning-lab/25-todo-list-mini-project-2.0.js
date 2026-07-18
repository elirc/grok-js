/*
JUNIOR GOAL:
Build a more realistic todo application with persistence, filtering, and better state management.

REAL WORLD USE CASE:
- Task management tools
- Lightweight CRUD interfaces
- Local-first applications

CONCEPTS COVERED:
- LocalStorage integration
- Derived state and filtering
- Better component-like separation in vanilla
- Optimistic updates
*/

// ============================================
// STEP 1: Persistence layer
// ============================================

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ============================================
// STEP 2: Filtering and derived data
// ============================================

function getFilteredTodos(filter) {
  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'completed') return todos.filter(t => t.completed);
  return todos;
}

// ============================================
// STEP 3: Better update patterns
// ============================================

function toggleTodo(id) {
  todos = todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  save();
  render();
}

/*
DEEPER BREAKDOWN:

localStorage as simple persistence.
In real apps you would use IndexedDB or a backend.

Derived data instead of maintaining multiple arrays.

JUNIOR PERSPECTIVE:

Even small apps benefit from clear data flow and separation of concerns.

COMMON PITFALLS IN PRODUCTION:

1. Not handling localStorage quota or corruption.
2. Directly mutating the todos array.
3. Not syncing UI after data changes.

EXPERIMENTS:

1. Add drag and drop reordering.
2. Add due dates and filtering by date.

JUNIOR CHALLENGE:

Extend the todo app with:
- Edit inline
- Bulk actions (complete all, clear completed)
- Simple undo using a stack
*/