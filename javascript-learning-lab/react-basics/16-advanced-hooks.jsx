/*
MID-LEVEL GOAL:
Master the less common but powerful built-in hooks for advanced use cases.

REAL WORLD USE CASE:
- Accessing DOM measurements without causing layout thrashing (useLayoutEffect)
- Exposing imperative APIs from components (useImperativeHandle)
- Managing refs that need to be stable across renders
- Synchronizing with external systems

CONCEPTS COVERED:
- useRef for mutable values and DOM access
- useLayoutEffect vs useEffect
- useImperativeHandle
- useId, useTransition, useDeferredValue (concurrent features)
- useSyncExternalStore for external state
*/

// ============================================
// STEP 1: useLayoutEffect for measurements
// ============================================

function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
  }, [targetRef]);

  return <div style={position}>Tooltip</div>;
}

// ============================================
// STEP 2: useImperativeHandle
// ============================================

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} />;
});

// ============================================
// STEP 3: useRef for instance variables
// ============================================

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/*
DEEPER BREAKDOWN:

useLayoutEffect runs synchronously after DOM mutations but before paint — use it for measurements that would cause flicker.

useImperativeHandle lets you control what a parent gets when it holds a ref to your component.

useRef can store any mutable value that doesn't need to trigger re-renders.

MID-LEVEL PERSPECTIVE:

These hooks exist for specific problems. Overusing them is a smell.

COMMON PITFALLS:

- Using useLayoutEffect when useEffect would be fine (hurts performance)
- Leaking imperative APIs that break the declarative model
- Storing values in refs that should be in state (no re-render when changed)

EXPERIMENTS:

1. Build a hook that measures an element's size on resize using ResizeObserver + useLayoutEffect.
2. Create a component that exposes a custom .reset() method via ref.
3. Implement a stable interval hook that doesn't restart when callback changes.

MID-LEVEL CHALLENGE:

Create a `useControllableState` hook that supports both controlled and uncontrolled usage (like many UI library components do). It should handle value + onChange from parent, or internal state when uncontrolled, with proper ref forwarding if needed.
*/