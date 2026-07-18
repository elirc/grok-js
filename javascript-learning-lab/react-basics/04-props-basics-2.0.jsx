/*
JUNIOR GOAL:
Design good prop interfaces and use advanced prop patterns effectively.

REAL WORLD USE CASE:
- Component libraries and design systems
- Flexible reusable components
- Type-safe component APIs with TypeScript + React

CONCEPTS COVERED:
- PropTypes vs TypeScript
- Render props and children as functions
- Default props and prop validation
- Forwarding refs
*/

// ============================================
// STEP 1: Children as render prop
// ============================================

function DataLoader({ url, children }) {
  const [data, setData] = useState(null);
  // fetch logic...
  return children(data);
}

// Usage: <DataLoader url="/api"> {data => <div>{data?.name}</div>} </DataLoader>

// ============================================
// STEP 2: Prop composition
// ============================================

function Button({ variant = 'primary', size = 'md', ...rest }) {
  return <button className={`btn ${variant} ${size}`} {...rest} />;
}

// ============================================
// STEP 3: Ref forwarding
// ============================================

const FancyInput = React.forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

/*
DEEPER BREAKDOWN:

Render props were popular before hooks.
Children as function is still useful for some patterns.

...rest + spreading requires care to avoid passing invalid props.

JUNIOR PERSPECTIVE:

Good prop design makes components pleasant to use.
Bad prop design leads to frustration and wrapper components everywhere.

COMMON PITFALLS IN PRODUCTION:

1. Passing too many props down without consideration.
2. Not documenting which props are required.
3. Accidentally passing DOM-invalid props.

EXPERIMENTS:

1. Implement a compound component pattern (Tabs with Tab and TabPanel).
2. Create a component that forwards refs correctly.

JUNIOR CHALLENGE:

Design a flexible List component that can render items using children, render prop, or a component prop.
*/