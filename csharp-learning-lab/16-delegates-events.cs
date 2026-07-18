/*
BEGINNER GOAL:
Understand delegates, events, and how C# supports event-driven programming.

REAL WORLD USE CASE:
Button clicks, notifications, pub/sub patterns, callbacks.

CONCEPTS COVERED:
- Delegate type
- Events
- Lambda expressions as delegates
- Action and Func
*/

// ============================================
// STEP 1: Action and Func
// ============================================

Action<string> log = message => Console.WriteLine(message);
Func<int, int, int> add = (a, b) => a + b;

// ============================================
// STEP 2: Event
// ============================================

public class Button
{
    public event EventHandler? Clicked;

    public void SimulateClick()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}

/*
LINE-BY-LINE BREAKDOWN:

Action<string>
- Delegate that takes a string and returns nothing

Func<int, int, int>
- Delegate that takes two ints and returns an int

event EventHandler
- Special delegate that can only be invoked from inside the class

NOOB TRANSLATION:

Delegates are like variables that hold methods.
Events are delegates with extra safety so only the owner can raise them.

COMMON MISTAKES:

1. Not unsubscribing from events (memory leaks).
2. Invoking events without null check.

TRY CHANGING THIS:

1. Create a custom delegate.
2. Subscribe to the Clicked event.

MINI CHALLENGE:

Create a class that raises an event when a value changes.
*/