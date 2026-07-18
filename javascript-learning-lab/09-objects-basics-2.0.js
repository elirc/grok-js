/*
JUNIOR GOAL:
Work confidently with objects using modern patterns for creation, updates, and safe property access.

REAL WORLD USE CASE:
- API response modeling
- Configuration objects
- Entity representations in state management
- Dynamic property access from user input or routes

CONCEPTS COVERED:
- Object shorthand and computed properties
- Object destructuring in real scenarios
- Safe property access with optional chaining
- Freezing and sealing objects
*/

// ============================================
// STEP 1: Modern object creation
// ============================================

function createUser(name, email, metadata = {}) {
  return {
    id: crypto.randomUUID?.() ?? Date.now(),
    name,
    email,
    ...metadata,
    createdAt: new Date().toISOString()
  };
}

// ============================================
// STEP 2: Immutable updates
// ============================================

const user = { id: 1, profile: { name: 'Alex', settings: { theme: 'dark' } } };

const updated = {
  ...user,
  profile: {
    ...user.profile,
    settings: { ...user.profile.settings, theme: 'light' }
  }
};

// ============================================
// STEP 3: Safe access patterns
// ============================================

const theme = user?.profile?.settings?.theme ?? 'light';

/*
DEEPER BREAKDOWN:

Computed properties and shorthand
- Very common when building objects from variables.

Deep spread for updates
- Required when working with nested state in immutable systems.

Optional chaining + nullish
- Critical for dealing with inconsistent API data.

JUNIOR PERSPECTIVE:

Objects are the primary data structure you'll work with.
Master non-mutating updates — it's non-negotiable in most modern stacks.

COMMON PITFALLS IN PRODUCTION:

1. Deep mutations that break time-travel debugging and React rendering.
2. Assuming object shape from APIs is stable.
3. Using delete operator in hot paths.

EXPERIMENTS:

1. Write a deepMerge utility for two objects.
2. Create a function that safely gets any nested path with a default.

JUNIOR CHALLENGE:

Create a function that takes a user object and returns a new object with:
- All top level fields
- A computed displayName
- A settings object that is guaranteed to have theme and notifications
Use only spread and modern syntax.
*/