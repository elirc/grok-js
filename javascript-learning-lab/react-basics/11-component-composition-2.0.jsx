/*
JUNIOR GOAL:
Master component composition patterns used in real design systems and applications.

REAL WORLD USE CASE:
- Building flexible UI libraries
- Layout systems
- Compound components

CONCEPTS COVERED:
- Compound components
- Context for component communication
- Slots and named children
- Render props vs children composition
*/

// ============================================
// STEP 1: Compound components
// ============================================

function Tabs({ children }) { /* manages state */ }
Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

// Usage: <Tabs><Tabs.List>...</Tabs.List><Tabs.Panel>...</Tabs.Panel></Tabs>

// ============================================
// STEP 2: Context for implicit passing
// ============================================

const TabsContext = createContext();

function Tab({ value }) {
  const { active, setActive } = useContext(TabsContext);
  // ...
}

// ============================================
// STEP 3: Flexible slots
// ============================================

function Page({ header, sidebar, children }) {
  return <div>{header}{sidebar}{children}</div>;
}

/*
DEEPER BREAKDOWN:

Compound components reduce prop drilling for related pieces.

Context enables this pattern without explicit prop passing.

JUNIOR PERSPECTIVE:

Composition patterns make your components much more flexible and pleasant to use.

COMMON PITFALLS IN PRODUCTION:

1. Overusing context when props would be clearer.
2. Leaking implementation details through context.
3. Creating too many small components that are hard to discover.

EXPERIMENTS:

1. Implement a simple compound component (Accordion or Select).
2. Add keyboard support to a compound component.

JUNIOR CHALLENGE:

Build a compound Select component with:
- Select.Trigger
- Select.Option
- Proper keyboard navigation
- Context for managing open state
*/