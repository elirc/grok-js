/*
JUNIOR GOAL:
Make informed decisions between interfaces and type aliases in real projects.

REAL WORLD USE CASE:
- Library authoring
- Large internal type systems
- Codebase consistency

CONCEPTS COVERED:
- Declaration merging
- Extends vs intersection
- When one is clearly better
- Team conventions
*/

// ============================================
// STEP 1: Declaration merging (interfaces only)
// ============================================

interface Window {
  myCustomProp: string;
}

// The above merges with the global Window

// ============================================
// STEP 2: Extension patterns
// ============================================

interface BaseEntity {
  id: number;
}

interface User extends BaseEntity {
  name: string;
}

type Product = BaseEntity & {
  title: string;
};

/*
DEEPER BREAKDOWN:

Interfaces support declaration merging (useful with global augmentation).
Types support more operations (unions, intersections, mapped types).

JUNIOR PERSPECTIVE:

Consistency within a project matters more than the "correct" choice.

COMMON PITFALLS IN PRODUCTION:

1. Mixing both randomly.
2. Relying on declaration merging unintentionally.
3. Choosing based on fashion instead of needs.

EXPERIMENTS:

1. Try to merge a type alias (you can't).
2. Create both an interface and type version of the same hierarchy.

JUNIOR CHALLENGE:

Audit a small TypeScript file and decide for each object type whether interface or type alias is more appropriate. Justify your choices.
*/