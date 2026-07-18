/*
BUG HUNT Minimal API
*/
// Forgetting to return results or using blocking calls on async handlers
// Route ordering surprises
// Missing validation (use filters or endpoint filters)
Console.WriteLine("Keep handlers thin, validate input, use DI.");
