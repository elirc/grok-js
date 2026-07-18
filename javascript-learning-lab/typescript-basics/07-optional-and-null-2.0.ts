/*
JUNIOR GOAL:
Handle optional and nullable values in a type-safe way that forces you to deal with absence.

REAL WORLD USE CASE:
- API data that may be missing
- Form fields that are optional
- Gradual data loading states

CONCEPTS COVERED:
- Optional properties vs nullable values
- Non-null assertion operator (and when to avoid it)
- Nullish coalescing and optional chaining in depth
- Strict null checks
*/

// ============================================
// STEP 1: Modeling optional data
// ============================================

interface Profile {
  bio?: string;
  website: string | null;
}

// ============================================
// STEP 2: Safe access patterns
// ============================================

const displayBio = profile.bio ?? 'No bio provided';
const city = user.address?.city ?? 'Unknown';

// ============================================
// STEP 3: Non-null assertions (use carefully)
// ============================================

// const name = user.name!; // Only when you have proven it cannot be null

/*
DEEPER BREAKDOWN:

? and | null | undefined are different.
? means the property may be absent.
| null means the property is present but can be null.

?? is safer than || for defaults.

JUNIOR PERSPECTIVE:

Embrace the compiler's help with nulls. It prevents an entire category of runtime errors.

COMMON PITFALLS IN PRODUCTION:

1. Using ! too liberally.
2. Confusing absence with null.
3. Not updating types when backend starts sending nulls.

EXPERIMENTS:

1. Create a type with several layers of optionality and practice safe access.
2. Replace || with ?? in several places and observe the difference.

JUNIOR CHALLENGE:

Model a User that has an optional nested Address object.
Write several functions that safely extract city, zip, and full address string with good defaults.
*/