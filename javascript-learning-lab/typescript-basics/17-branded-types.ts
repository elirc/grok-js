/*
MID-LEVEL GOAL:
Use branded/nominal typing techniques to distinguish between values that have the same structural type but different semantic meaning.

REAL WORLD USE CASE:
- IDs of different entities (UserId vs PostId)
- Units (Cents vs Dollars, Meters vs Feet)
- Tokens and secrets that should not be mixed with plain strings
- Phantom types for state machines

CONCEPTS COVERED:
- Branded types using intersection with unique symbols or strings
- Type guards for brands
- Phantom data for state
- Nominal typing in a structural system
*/

// ============================================
// STEP 1: Simple branding
// ============================================

declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function getUser(id: UserId) { /* ... */ }

// ============================================
// STEP 2: Creating branded values safely
// ============================================

function createUserId(raw: string): UserId {
  if (!raw.startsWith('user_')) throw new Error('Invalid');
  return raw as UserId; // only here do we assert
}

// ============================================
// STEP 3: Phantom state example
// ============================================

type Draft = { readonly __brand: unique symbol & { state: 'draft' } };
type Published = { readonly __brand: unique symbol & { state: 'published' } };

type Article<S> = { id: string; content: string } & S;

/*
DEEPER BREAKDOWN:

Branding adds a phantom property that only exists at the type level.
It prevents accidental mixing of semantically different values that happen to have the same runtime type.

MID-LEVEL PERSPECTIVE:

This technique dramatically reduces a class of "wrong ID passed" bugs.

COMMON PITFALLS:

- Leaking the creation function and allowing invalid brands
- Overusing brands for everything (readability cost)
- Forgetting that brands disappear at runtime

EXPERIMENTS:

1. Brand currency values (Cents vs Dollars) and write safe conversion functions.
2. Implement a tiny state machine using phantom brands.

MID-LEVEL CHALLENGE:

Create branded types for OrderId, CustomerId, and AmountInCents.
Build functions that can only be called with the correct brand (e.g. chargeCustomer cannot take a random string).
Include a way to safely create brands from validated input.
*/