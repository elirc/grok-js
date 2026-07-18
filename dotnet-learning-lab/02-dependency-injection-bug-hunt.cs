/*
BUG HUNT: DI
Common anti-pattern: new inside the class everywhere (hard to replace).
Common mistake: forgetting to register service in the container.
*/
using Microsoft.Extensions.DependencyInjection;

class Program {
  // Imagine a service that does "new HttpClient()" inside instead of taking it in constructor
  // Bug: cannot swap for test version, cannot control lifetime (singleton vs scoped)
  static void Main() {
    Console.WriteLine("Lesson: new-ing your dependencies hides them and makes testing and config painful.");
  }
}
