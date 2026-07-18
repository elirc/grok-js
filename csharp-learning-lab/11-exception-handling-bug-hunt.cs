/*
BUG HUNT C# Exceptions
*/
// Catching Exception and doing nothing
// Not using using / disposables causing leaks
// Throwing in finally masking the real exception
Console.WriteLine("Handle specific, log, cleanup correctly.");
