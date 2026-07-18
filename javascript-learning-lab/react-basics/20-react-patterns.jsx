/*
MID-LEVEL GOAL:
Master advanced component patterns used in production component libraries and large applications.

REAL WORLD USE CASE:
- Building internal design systems
- Highly flexible and composable UIs
- Accessibility-first components
- Headless UI libraries

CONCEPTS COVERED:
- Compound components
- Render props (still relevant in some cases)
- Controlled vs uncontrolled components
- Polymorphic components (as prop)
- Headless hooks + UI separation
*/

// ============================================
// STEP 1: Compound components with context
// ============================================

const MenuContext = createContext();

function Menu({ children }) {
  const [open, setOpen] = useState(false);
  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>;
}

Menu.Trigger = function Trigger({ children }) {
  const { setOpen } = useContext(MenuContext);
  return <button onClick={() => setOpen(o => !o)}>{children}</button>;
};

Menu.Content = function Content({ children }) {
  const { open } = useContext(MenuContext);
  return open ? <div>{children}</div> : null;
};

// ============================================
// STEP 2: Polymorphic 'as' prop
// ============================================

function Button({ as: Component = 'button', ...props }) {
  return <Component {...props} />;
}

// <Button as="a" href="...">Link button</Button>

// ============================================
// STEP 3: Headless + composition
// ============================================

// Expose hooks or renderless components + let consumer provide markup.

/*
DEEPER BREAKDOWN:

Compound components reduce prop drilling for tightly related pieces.
Polymorphism increases flexibility without sacrificing semantics.

Headless patterns separate behavior from presentation.

MID-LEVEL PERSPECTIVE:

These patterns make your components dramatically more powerful and reusable.

COMMON PITFALLS:

- Leaking too many implementation details through context
- Overusing 'as' and creating invalid DOM structures
- Making patterns so flexible they become hard to document and use

EXPERIMENTS:

1. Implement a compound Tabs component with keyboard support.
2. Create a polymorphic Box component that forwards refs and merges props correctly.
3. Build a headless useCombobox hook and a simple UI on top of it.

MID-LEVEL CHALLENGE:

Design and implement a flexible Select component using compound components + headless logic. It should support:
- Custom trigger and option rendering via children or render props
- Keyboard navigation
- Multi-select
- The 'as' prop on parts
- Full control via props or uncontrolled mode
*/