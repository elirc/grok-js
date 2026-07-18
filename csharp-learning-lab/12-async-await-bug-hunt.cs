/*
BUG HUNT async C#
*/
// async void (fire and forget + hard exceptions)
// blocking on .Result or .Wait() causing deadlock
// Not using CancellationToken
Console.WriteLine("async bugs are some of the hardest to debug.");
