/*
NARRATIVE .NET: Building a real app (grokbuild style)
Story: You are wiring up a Snack API service.
Instead of the controller new-ing a Logger and a Database, the framework gives them via constructor.
*/
using System;
public class SnackService {
  private readonly ILogger _log;
  public SnackService(ILogger log) { _log = log; }
  public void LogSnack(string name) => _log.Log("Logged " + name);
}
Console.WriteLine("DI in story = easy to replace real DB with fake during development.");
