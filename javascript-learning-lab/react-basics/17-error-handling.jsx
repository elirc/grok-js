/*
MID-LEVEL GOAL:
Implement proper error handling and recovery in React applications beyond simple try/catch.

REAL WORLD USE CASE:
- Preventing entire app crashes from one bad component
- Graceful degradation in production
- Logging errors to monitoring services (Sentry, etc.)
- User-friendly error recovery UI

CONCEPTS COVERED:
- Error Boundaries (class component requirement)
- Error recovery strategies
- ComponentDidCatch and getDerivedStateFromError
- Suspense + error boundaries together
- Logging and reporting errors
*/

// ============================================
// STEP 1: Error Boundary
// ============================================

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to Sentry / monitoring
    console.error('Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// ============================================
// STEP 2: Using with Suspense
// ============================================

<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Loading />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>

// ============================================
// STEP 3: Recovery
// ============================================

function RecoveryErrorBoundary({ children, onReset }) {
  // Allow parent to reset the boundary by changing a key
  // or expose a reset function via context/ref
}

/*
DEEPER BREAKDOWN:

Error boundaries only catch errors during render, in lifecycle methods, and in constructors.
They do not catch errors in:
- Event handlers
- Asynchronous code (setTimeout, promises)
- Server-side rendering
- The error boundary itself

For those, use try/catch + error states.

MID-LEVEL PERSPECTIVE:

Production apps must never show a white screen. Error boundaries + good fallbacks are table stakes.

COMMON PITFALLS:

- Expecting error boundaries to catch event handler errors
- Not resetting state properly after error recovery
- Logging sensitive data in error reports
- Wrapping everything in one giant boundary (loses granularity)

EXPERIMENTS:

1. Create a reusable ErrorBoundary that accepts a resetKeys prop to auto-recover.
2. Simulate an error in a child and verify the boundary catches it.
3. Add a "Try again" button that resets the boundary.

MID-LEVEL CHALLENGE:

Build a production-ready ErrorBoundary that:
- Accepts a fallback render prop receiving error + reset function
- Automatically resets on route change (using a key strategy)
- Reports errors to a fake logging service
- Supports nested boundaries with different severity levels
*/