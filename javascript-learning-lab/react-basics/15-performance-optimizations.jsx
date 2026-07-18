/*
MID-LEVEL GOAL:
Apply React performance optimizations deliberately and measure their impact instead of using them by default.

REAL WORLD USE CASE:
- Large lists and tables
- Expensive computations in render
- Frequent parent re-renders affecting children
- Code splitting for initial load time

CONCEPTS COVERED:
- React.memo, useMemo, useCallback
- When they help vs when they hurt
- React DevTools Profiler usage
- Code splitting with lazy + Suspense
- Identifying wasted renders
*/

// ============================================
// STEP 1: Proper memoization
// ============================================

const ExpensiveChild = React.memo(({ data, onSelect }) => {
  // heavy render or computation
  return <div onClick={() => onSelect(data.id)}>{data.name}</div>;
});

function Parent({ items }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, []); // stable

  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(items);
  }, [items]);

  return (
    <>
      {items.map(item => (
        <ExpensiveChild key={item.id} data={item} onSelect={handleSelect} />
      ))}
    </>
  );
}

// ============================================
// STEP 2: Code splitting
// ============================================

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}

/*
DEEPER BREAKDOWN:

React.memo does a shallow prop comparison.
If you pass new objects/arrays/functions every render, memo does nothing.

useCallback + useMemo have a cost. Use them when the value is passed to memoized children or used in effect deps.

Always profile before and after.

MID-LEVEL PERSPECTIVE:

Premature optimization with memo everywhere can make code harder to read and sometimes slower.
Measure first.

COMMON PITFALLS:

- Memoizing everything "just in case"
- Creating new functions/objects inside useMemo/useCallback deps
- Using memo on components that are always different anyway
- Forgetting Suspense when using lazy

EXPERIMENTS:

1. Use React DevTools Profiler to find wasted renders before and after memo.
2. Implement a virtualized list and compare with naive .map rendering.
3. Lazy load a heavy route and observe bundle impact.

MID-LEVEL CHALLENGE:

Optimize a dashboard that renders:
- 200 list items with expensive cards
- Multiple charts that depend on filters
- A live-updating section

Provide before/after profiler screenshots (or describe results) and justify every optimization used.
*/