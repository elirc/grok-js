/*
BEGINNER GOAL:
Read and write files in .NET.

REAL WORLD USE CASE:
Reading configuration files, writing logs, importing/exporting data, generating reports.

CONCEPTS COVERED:
- File and FileInfo
- StreamReader / StreamWriter
- async file operations
- Path helpers
*/

// ============================================
// STEP 1: Simple file operations
// ============================================

string content = await File.ReadAllTextAsync("data.txt");
await File.WriteAllTextAsync("output.txt", "Hello from .NET!");

// ============================================
// STEP 2: Using streams (better for large files)
// ============================================

await using var writer = new StreamWriter("log.txt", append: true);
await writer.WriteLineAsync(DateTime.Now + " - Log entry");

// ============================================
// STEP 3: Path class
// ============================================

string fullPath = Path.Combine("C:", "Data", "file.txt");
string extension = Path.GetExtension(fullPath);

/*
LINE-BY-LINE BREAKDOWN:

File.ReadAllTextAsync
- Simple and async

await using
- Ensures the stream is disposed properly

Path.Combine
- Handles path separators correctly across OSes

NOOB TRANSLATION:

Use the high-level File class for small files.
Use streams for large files or when you need more control.

COMMON MISTAKES:

1. Not using async for file operations.
2. Forgetting to dispose streams (use 'using').
3. Hardcoding path separators ('\\' vs '/').

TRY CHANGING THIS:

1. Read a file line by line.
2. Create a directory if it doesn't exist.

MINI CHALLENGE:

Write a method that reads a CSV file and returns a list of objects.
*/