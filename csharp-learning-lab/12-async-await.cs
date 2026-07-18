/*
BEGINNER GOAL:
Learn how to write asynchronous code in C# using async and await.

REAL WORLD USE CASE:
Calling web APIs, reading files, database operations without freezing the UI or blocking threads.

CONCEPTS COVERED:
- async and await keywords
- Task and Task<T>
- When to use async
- Common patterns
*/

// ============================================
// STEP 1: Async method
// ============================================

public async Task<string> GetDataAsync()
{
    await Task.Delay(1000); // Simulate work
    return "Data received";
}

// ============================================
// STEP 2: Calling async code
// ============================================

string result = await GetDataAsync();
Console.WriteLine(result);

// ============================================
// STEP 3: Handling multiple tasks
// ============================================

var task1 = GetDataAsync();
var task2 = GetDataAsync();

await Task.WhenAll(task1, task2);

/*
LINE-BY-LINE BREAKDOWN:

async Task<string>
- Marks the method as asynchronous
- Returns a Task that will eventually have a string

await
- "Wait here without blocking the thread until this is done"

Task.WhenAll
- Run multiple async operations at the same time

NOOB TRANSLATION:

async/await lets you write code that waits for slow things (network, disk) without freezing everything else.

COMMON MISTAKES:

1. Forgetting await (fire and forget).
2. Using .Result or .Wait() (can cause deadlocks).
3. Not making the calling method async.

TRY CHANGING THIS:

1. Add a try-catch around an await.
2. Use Task.WhenAll for two operations.

MINI CHALLENGE:

Write an async method that calls two slow operations in parallel and returns when both finish.
*/