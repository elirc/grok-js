/*
JUNIOR GOAL:
Understand different approaches to state management and when to reach for each.

REAL WORLD USE CASE:
- Local vs global state decisions
- When useState + props is enough
- Introduction to more advanced patterns

CONCEPTS COVERED:
- Lifting state and prop drilling
- Context as lightweight global state
- Derived state vs stored state
- When to introduce external state libraries
*/

// ============================================
// STEP 1: When to lift state
// ============================================

// If two components need the same data, lift it to the common parent.

// ============================================
// STEP 2: Context for cross-cutting concerns
// ============================================

const ThemeContext = createContext('light');

// ============================================
// STEP 3: Decision framework
// ============================================

// Start with useState in the closest component.
// Lift when needed.
// Add Context for truly global concerns (theme, auth, etc.).
// Consider external libraries only when the above becomes painful.

/*
DEEPER BREAKDOWN:

Most applications do not need Redux or similar on day one.
Start simple.

JUNIOR PERSPECTIVE:

Understanding when state management is "overkill" is an important skill.

COMMON PITFALLS IN PRODUCTION:

1. Putting everything in global state too early.
2. Prop drilling through 6 components instead of using context.
3. Choosing a complex solution before understanding the problem.

EXPERIMENTS:

1. Refactor a prop-drilled value into context.
2. Move some state from global into a parent component.

JUNIOR CHALLENGE:

Audit a medium-sized component tree and decide for each piece of state:
- Should it stay local?
- Should it be lifted?
- Should it go into context?
Provide reasoning.
*/