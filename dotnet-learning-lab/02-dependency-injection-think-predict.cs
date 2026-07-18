/*
THINK-PREDICT: DI Basics (.NET)
DI is about who creates objects and who receives them.
*/

using System;

public interface ILogger { void Log(string m); }
public class ConsoleLogger : ILogger { public void Log(string m) => Console.WriteLine(m); }

class Program {
  static void Main() {
    // Without DI: class creates its own dependency
    // With DI: someone else gives it the dependency

    // PREDICT: how does this affect testing?
    Console.WriteLine("Predict: which version is easier to unit test with a FakeLogger?");
  }
}
