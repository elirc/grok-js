/*
JUNIOR GOAL:
Design components that are reusable, testable, and follow React best practices.

REAL WORLD USE CASE:
- Building design systems
- Feature development in large apps
- Code splitting and lazy loading considerations

CONCEPTS COVERED:
- Functional components as the standard
- Component boundaries and responsibilities
- Prop drilling vs composition
- Display name and debugging
*/

// ============================================
// STEP 1: Single responsibility components
// ============================================

function UserAvatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}

function UserInfo({ user }) {
  return (
    <>
      <UserAvatar user={user} />
      <span>{user.name}</span>
    </>
  );
}

// ============================================
// STEP 2: Composition over props explosion
// ============================================

function UserCard({ user, actions }) {
  return (
    <div>
      <UserInfo user={user} />
      {actions}
    </div>
  );
}

/*
DEEPER BREAKDOWN:

Small focused components are easier to test and reason about.

Passing elements as props (actions) is often better than boolean flags.

JUNIOR PERSPECTIVE:

Resist the urge to make one component do everything.
Split early and often.

COMMON PITFALLS IN PRODUCTION:

1. God components with 30+ props.
2. Components that know too much about their parents.
3. Duplicated UI logic across similar components.

EXPERIMENTS:

1. Take a large component and split it into 3-4 smaller ones.
2. Replace boolean props with component composition.

JUNIOR CHALLENGE:

Refactor a complex settings panel into multiple focused components that compose together.
*/