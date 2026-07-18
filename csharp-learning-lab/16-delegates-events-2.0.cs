/*
JUNIOR GOAL:
Use delegates and events correctly in modern C# while understanding their performance and memory implications.

REAL WORLD USE CASE:
Event-driven architectures, plugin systems, UI frameworks, and reactive programming patterns.

CONCEPTS COVERED:
- Delegate invocation list
- Weak event patterns
- EventHandler<T> and EventArgs
- Func/Action vs custom delegates
- Multicast delegates and exceptions
*/

// ============================================
// STEP 1: Modern event declaration
// ============================================

public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;

// ============================================
// STEP 2: Safe invocation
// ============================================

protected virtual void OnOrderPlaced(OrderPlacedEventArgs e)
{
    OrderPlaced?.Invoke(this, e);
}

// ============================================
// STEP 3: Avoiding memory leaks
// ============================================

// Use weak event pattern or unsubscribe in IDisposable
// Or use EventHandlerList for many events

/*
DEEPER BREAKDOWN:

Events are multicast delegates with add/remove accessors.
Invoking with ?. is the safe modern pattern.

Unsubscribing is critical when the subscriber has a longer lifetime than the event source.

JUNIOR PERSPECTIVE:

Events are powerful but easy to misuse, especially regarding object lifetime.

COMMON PITFALLS IN PRODUCTION:

- Forgetting to unsubscribe from events (memory leaks).
- Exceptions in one handler stopping the others in a multicast delegate.
- Using custom delegates instead of EventHandler<T> or Action.

EXPERIMENTS:

1. Demonstrate a memory leak caused by an unsubscribed event.
2. Show what happens when one handler in a multicast delegate throws.
3. Implement a simple weak event manager.

JUNIOR CHALLENGE:

Create a domain event dispatcher using delegates that:
- Supports async handlers
- Allows handlers to be registered with a lifetime (e.g., IDisposable)
- Handles exceptions without stopping other handlers
- Is easy to test
*/