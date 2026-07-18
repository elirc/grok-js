/*
JUNIOR GOAL:
Write correct and efficient asynchronous code, avoiding common pitfalls around synchronization, cancellation, and resource management.

REAL WORLD USE CASE:
High-scale web services, background processing, and I/O heavy applications.

CONCEPTS COVERED:
- ConfigureAwait(false)
- CancellationToken best practices
- ValueTask and when to use it
- Async local state
- Proper cleanup with IAsyncDisposable
*/

// ============================================
// STEP 1: ConfigureAwait
// ============================================

var data = await httpClient.GetStringAsync(url).ConfigureAwait(false);

// ============================================
// STEP 2: Cancellation
// ============================================

public async Task ProcessAsync(CancellationToken ct = default)
{
    var response = await http.GetAsync(url, ct);
    ct.ThrowIfCancellationRequested();
    // ...
}

// ============================================
// STEP 3: Async disposal
// ============================================

await using var resource = new AsyncResource();

/*
DEEPER BREAKDOWN:

ConfigureAwait(false) avoids capturing the SynchronizationContext — important in libraries and ASP.NET.

Always flow CancellationToken.

Use IAsyncDisposable for resources that have async cleanup.

JUNIOR PERSPECTIVE:

Async code looks synchronous but has many subtle rules. Mastering cancellation and context is what separates good async code from buggy async code.

COMMON PITFALLS IN PRODUCTION:

- Deadlocks from blocking on async code ( .Result / .Wait() ).
- Not passing or checking CancellationToken.
- Capturing context unnecessarily.
- Forgetting to await or dispose async resources.

EXPERIMENTS:

1. Demonstrate a deadlock scenario and fix it.
2. Implement a method that supports cancellation and proper cleanup.
3. Compare Task vs ValueTask in a hot path.

JUNIOR CHALLENGE:

Write a resilient async method that:
- Calls two external services in parallel
- Supports cancellation
- Has a timeout
- Cleans up properly on any failure path
- Uses ConfigureAwait(false)
*/