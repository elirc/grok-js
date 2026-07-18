/*
JUNIOR GOAL:
Use inheritance and polymorphism correctly while knowing when composition is the better choice.

REAL WORLD USE CASE:
Framework extensibility, plugin systems, and modeling real hierarchies without creating fragile base classes.

CONCEPTS COVERED:
- virtual / override / sealed
- abstract classes vs interfaces
- Liskov Substitution Principle in practice
- Composition over inheritance
- Default interface methods
*/

// ============================================
// STEP 1: Sealed and performance
// ============================================

public sealed class FinalPaymentProcessor : IPaymentProcessor
{
    // Sealing can enable devirtualization
}

// ============================================
// STEP 2: Composition example
// ============================================

public class OrderProcessor
{
    private readonly IPaymentProcessor _payment;
    private readonly IInventory _inventory;

    public OrderProcessor(IPaymentProcessor payment, IInventory inventory)
    {
        _payment = payment;
        _inventory = inventory;
    }
}

/*
DEEPER BREAKDOWN:

Favor composition. Inheritance creates tight coupling and is hard to change later.

Use abstract classes when you want to share implementation.
Use interfaces when you want to define contracts.

Sealed classes help the JIT and signal intent.

JUNIOR PERSPECTIVE:

Inheritance is overused by beginners. Most of the time you want interfaces + composition or records.

COMMON PITFALLS IN PRODUCTION:

- Deep inheritance hierarchies that are impossible to refactor.
- Violating LSP (e.g., Square inheriting from Rectangle).
- Using inheritance for code reuse instead of behavior specialization.

EXPERIMENTS:

1. Refactor an inheritance hierarchy into composition.
2. Create an interface with a default method and consume it.
3. Use sealed on a performance-critical class and measure.

JUNIOR CHALLENGE:

Model a notification system using composition:
- Different channels (Email, SMS, Push)
- Different formatters
- Retry policies

Show how adding a new channel or formatter requires no changes to existing code.
*/