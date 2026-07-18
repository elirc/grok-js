/*
BEGINNER GOAL:
Understand the differences between interface and type, and when to use each.

REAL WORLD USE CASE:
Both are used heavily in real projects.
Knowing the differences helps you read other people's code and decide what to use in your own projects.

CONCEPTS COVERED:
- Similarities between interface and type
- Key differences (declaration merging, extending, etc.)
- When most beginners should pick one
*/

// ============================================
// STEP 1: They are very similar
// ============================================

interface UserInterface {
  name: string;
}

type UserType = {
  name: string;
};

// Both can be used almost the same way.

let userA: UserInterface = { name: "Alex" };
let userB: UserType = { name: "Sam" };

// ============================================
// STEP 2: One big difference - declaration merging
// ============================================

// You can declare the same interface multiple times.
// TypeScript will merge them together.

interface Settings {
  theme: string;
}

interface Settings {
  language: string;
}

// Now Settings has both theme and language!

let appSettings: Settings = {
  theme: "dark",
  language: "en"
};

// This does NOT work with type aliases.

// ============================================
// STEP 3: Extending
// ============================================

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let myDog: Dog = {
  name: "Luna",
  breed: "Golden Retriever"
};

// You can also extend types using intersection:
type Cat = Animal & { color: string };

/*
LINE-BY-LINE BREAKDOWN:

interface Settings { ... }
interface Settings { ... }
- Because both are named Settings, TypeScript combines them
- This feature is called declaration merging
- Very useful in some advanced cases (especially with libraries)

interface Dog extends Animal
- Dog gets everything from Animal plus its own properties

type Cat = Animal & { color: string }
- The & is called intersection
- It combines the two types

NOOB TRANSLATION:

interface and type are like two different ways to label a box.

Most of the time they feel the same.

The main practical difference for beginners:
- Use interface when you might want to "extend" or "merge" shapes later
- Use type when you are working with unions or need more flexibility

For most beginner projects, you can pick one and stay consistent.

COMMON MISTAKES:

1. Worrying too much about the difference early on
2. Mixing interface and type randomly in the same file
3. Trying to merge type aliases (doesn't work)

TRY CHANGING THIS:

1. Create the same shape using both interface and type.

2. Try to extend both versions.

3. Create a union type that you could not easily do with interface.

MINI CHALLENGE:

Create a base interface called Entity that has an id (number).
Then create two interfaces that extend it: User and Product.
Add a couple of extra properties to each.
*/