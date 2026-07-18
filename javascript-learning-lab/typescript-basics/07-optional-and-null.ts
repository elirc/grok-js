/*
BEGINNER GOAL:
Learn how TypeScript handles optional values, undefined, and null safely.

REAL WORLD USE CASE:
Data from APIs, forms, and user input is often missing.
TypeScript helps you avoid the classic "Cannot read property X of undefined" errors.

CONCEPTS COVERED:
- Optional properties with ?
- undefined and null types
- The non-null assertion operator (!)
- Optional chaining (?.) - basic introduction
*/

// ============================================
// STEP 1: Optional properties (review + deeper)
// ============================================

interface Profile {
  username: string;
  bio?: string;           // optional
  website?: string;
}

let myProfile: Profile = {
  username: "alexdev"
};

// ============================================
// STEP 2: undefined vs null
// ============================================

let notSetYet: undefined = undefined;

let emptyOnPurpose: null = null;

// In practice we often use union with these:

let middleName: string | undefined;

middleName = "James";
middleName = undefined;   // allowed

// ============================================
// STEP 3: Safely accessing optional values
// ============================================

function getBio(profile: Profile) {
  // profile.bio might be undefined, so we check first
  if (profile.bio) {
    return profile.bio.toUpperCase();
  }
  return "No bio available";
}

// ============================================
// STEP 4: Optional chaining (very useful)
// ============================================

let user = {
  name: "Alex",
  address: {
    city: "Portland"
  }
};

// Without optional chaining this could crash:
// console.log(user.address.zip.code);

let zip = user.address?.city;   // Safe. If address didn't exist, this would be undefined

/*
LINE-BY-LINE BREAKDOWN:

bio?: string
- The ? means this property might not exist on the object

let middleName: string | undefined;
- This variable can be a string or it can be undefined
- It cannot be null unless we also include null in the union

if (profile.bio)
- This is a common way to check for the presence of an optional value

user.address?.city
- The ?. is optional chaining
- If user.address is undefined or null, the whole expression becomes undefined instead of crashing

NOOB TRANSLATION:

Optional means "this might not be here."
TypeScript forces you to think about what happens when the value is missing.

This is one of the biggest quality-of-life improvements TypeScript gives you over plain JavaScript.

COMMON MISTAKES:

1. Using a value without checking if it's optional first

2. Overusing the non-null assertion (!) operator (user.name!)
   - This tells TypeScript "trust me, it's not null" — use it carefully

3. Confusing undefined and null
   - undefined usually means "not set yet"
   - null usually means "intentionally empty"

TRY CHANGING THIS:

1. Create an interface with two optional properties.

2. Try to use one of the optional properties without checking and see the error.

3. Use optional chaining to safely access a deeply nested property.

MINI CHALLENGE:

Create a function called getDisplayName that takes a user object.
The user may or may not have a "nickname".
If nickname exists, return it. Otherwise return the regular name.
Use proper types and handle the optionality safely.
*/