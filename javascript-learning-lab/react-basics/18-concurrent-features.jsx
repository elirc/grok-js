/*
MID-LEVEL GOAL:
Understand React's concurrent features and how they change the way we think about rendering and user experience.

REAL WORLD USE CASE:
- Non-blocking UI updates during heavy computation
- Prioritizing user input over data updates
- Better loading experiences with Suspense for data
- Transitioning between views without jank

CONCEPTS COVERED:
- Concurrent rendering model
- useTransition and startTransition
- useDeferredValue
- Suspense for data fetching (conceptual)
- Interruptible rendering and priorities
*/

// ============================================
// STEP 1: useTransition
// ============================================

function TabContainer() {
  const [tab, setTab] = useState('posts');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab); // low priority update
    });
  };

  return (
    <>
      <button onClick={() => handleTabChange('posts')}>Posts</button>
      {isPending && <Spinner />}
      {tab === 'posts' && <Posts />}
    </>
  );
}

// ============================================
// STEP 2: useDeferredValue
// ============================================

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <Results query={deferredQuery} />;
}

// ============================================
// STEP 3: Thinking in priorities
// ============================================

// React can interrupt a low-priority render to handle a high-priority update
// (e.g. typing in an input while a list is re-rendering).

/*
DEEPER BREAKDOWN:

Concurrent features allow React to prepare multiple versions of the UI at the same time.
Transitions mark updates as non-urgent so user interactions stay responsive.

useDeferredValue lets you keep the UI responsive while showing slightly stale data.

MID-LEVEL PERSPECTIVE:

These features shine in data-heavy or complex UIs. Understanding when to mark something as a transition vs urgent update is key.

COMMON PITFALLS:

- Using transitions for everything (loses the benefit)
- Forgetting to show pending state to the user
- Expecting immediate consistency when using deferred values

EXPERIMENTS:

1. Compare a slow list filter with and without useTransition.
2. Use useDeferredValue for a live search preview.
3. Measure input responsiveness with heavy rendering work.

MID-LEVEL CHALLENGE:

Build a UI with:
- A text input
- A heavy computed list (10k+ items with expensive rendering)
- Tabs that switch views

Use transitions and deferred values so typing never feels laggy, even while the list is updating. Provide measurements or explanations of the improvement.
*/