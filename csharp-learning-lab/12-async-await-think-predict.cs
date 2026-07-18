/*
THINK-PREDICT C# async/await
*/
async Task<int> Get() { await Task.Delay(1); return 42; }
/* Predict ConfigureAwait, deadlocks in UI, async all the way */
Console.WriteLine("Async changes the shape of .NET story code.");
