/*
JUNIOR GOAL:
Handle file and stream operations safely, efficiently, and asynchronously in production .NET applications.

REAL WORLD USE CASE:
Uploading/downloading files, processing large CSVs or logs, generating reports, and working with cloud storage.

CONCEPTS COVERED:
- Stream best practices
- Async file I/O
- MemoryStream vs FileStream
- Pipelines for high-performance parsing (System.IO.Pipelines)
- Handling large files without loading everything into memory
*/

// ============================================
// STEP 1: Safe async file operations
// ============================================

await using var stream = File.OpenRead(path);
using var reader = new StreamReader(stream);
string? line;
while ((line = await reader.ReadLineAsync()) is not null)
{
    // process line
}

// ============================================
// STEP 2: Processing large files
// ============================================

// Use FileStream with buffer and ReadAsync in a loop
// Or System.IO.Pipelines for maximum performance

/*
DEEPER BREAKDOWN:

Always prefer async file APIs in server applications.

Use 'using' or 'await using' to ensure streams are disposed (important for file handles).

For very large files, never call ReadAllTextAsync — stream the data instead.

JUNIOR PERSPECTIVE:

File I/O is a common source of resource leaks and performance problems. Treat streams as disposable resources that must be cleaned up promptly.

COMMON PITFALLS IN PRODUCTION:

- Holding file handles open too long.
- Loading entire large files into memory.
- Not handling IOException properly (disk full, permissions, etc.).
- Mixing sync and async file code.

EXPERIMENTS:

1. Compare memory usage of ReadAllBytes vs streaming a 100MB file.
2. Implement a line-by-line CSV processor using StreamReader + async.
3. Use System.IO.Pipelines to parse a large file with backpressure.

JUNIOR CHALLENGE:

Write a service that safely copies a large file from one location to another while:
- Reporting progress
- Supporting cancellation
- Verifying the copy with a hash
- Cleaning up on failure
*/