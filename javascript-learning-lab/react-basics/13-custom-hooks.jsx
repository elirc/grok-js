/*
MID-LEVEL GOAL:
Design and implement robust, reusable custom hooks that encapsulate complex logic while following React rules and best practices.

REAL WORLD USE CASE:
- Data fetching hooks (useQuery, useFetch)
- Form state and validation hooks
- Browser API hooks (useLocalStorage, useMediaQuery, useIntersectionObserver)
- State machines and complex effects

CONCEPTS COVERED:
- Rules of hooks (why they exist)
- Custom hook composition
- Returning values vs objects vs tuples
- Cleanup, dependencies, and race conditions
- Testing custom hooks
*/

// ============================================
// STEP 1: Basic custom hook pattern
// ============================================

function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(stored) : value;
      setStored(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };

  return [stored, setValue];
}

// ============================================
// STEP 2: Handling async + cancellation
// ============================================

function useUser(userId) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState(s => ({ ...s, loading: true }));

    fetchUser(userId)
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: err });
      });

    return () => { cancelled = true; };
  }, [userId]);

  return state;
}

// ============================================
// STEP 3: Composition
// ============================================

function useUserProfile(userId) {
  const user = useUser(userId);
  const [isEditing, setIsEditing] = useLocalStorage(`editing-${userId}`, false);

  return { ...user, isEditing, setIsEditing };
}

/*
DEEPER BREAKDOWN:

Custom hooks are the primary way to share stateful logic in React.
They must follow the Rules of Hooks (only call at top level).

Returning a tuple vs object has tradeoffs (destructuring vs named access).

Always handle cleanup and cancellation in effects inside custom hooks.

MID-LEVEL PERSPECTIVE:

Good custom hooks abstract away complexity and make components declarative.
Bad ones hide bugs and create hard-to-debug dependency issues.

COMMON PITFALLS:

- Violating rules of hooks inside custom hooks
- Missing dependencies that cause stale data or infinite loops
- Not cleaning up subscriptions or in-flight requests
- Over-generalizing too early

EXPERIMENTS:

1. Implement useDebouncedValue and useThrottledValue.
2. Create usePrevious that tracks the previous value of a prop/state.
3. Build useOnClickOutside using refs and effect cleanup.

MID-LEVEL CHALLENGE:

Create a production-ready `useFetch` hook that supports:
- Automatic cancellation on unmount or when url/params change
- Loading, data, and error states
- Manual refetch function
- Optional polling with pause/resume
- TypeScript generics for the response data
*/