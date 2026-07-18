/*
JUNIOR GOAL:
Use type aliases effectively to create readable, reusable, and composable types.

REAL WORLD USE CASE:
- Shared utility types
- API response wrappers
- Complex computed types

CONCEPTS COVERED:
- Type aliases vs interfaces
- Conditional types basics
- Template literal types
- Utility type composition
*/

// ============================================
// STEP 1: Reusable aliases
// ============================================

type ID = string | number;
type Timestamp = string;

type UserWithTimestamps = User & { createdAt: Timestamp };

// ============================================
// STEP 2: Template literal types
// ============================================

type EventName = `on${Capitalize<string>}`;

// ============================================
// STEP 3: Composition
// ============================================

type PartialUser = Partial<User>;
type UserWithoutId = Omit<User, 'id'>;

/*
DEEPER BREAKDOWN:

Type aliases are great for giving names to complex expressions.
They work well with utility types and composition.

JUNIOR PERSPECTIVE:

Good type names improve readability as much as good variable names.

COMMON PITFALLS IN PRODUCTION:

1. Creating too many tiny aliases that obscure meaning.
2. Using type when interface would allow better extension.
3. Not leveraging built-in utility types.

EXPERIMENTS:

1. Create a set of utility types for a domain (e.g. CreateUser, UpdateUser).
2. Experiment with template literal types for event names.

JUNIOR CHALLENGE:

Build a small set of utility types:
- Make all properties optional except id
- Create a type for creating a new entity without id and timestamps
- Extract a "Summary" version of an entity with only a few fields
*/