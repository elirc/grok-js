/*
BEGINNER GOAL:
Learn the basics of Dependency Injection (DI) — the standard way .NET manages dependencies.

REAL WORLD USE CASE:
Making code testable, modular, and following SOLID principles.

CONCEPTS COVERED:
- Services and lifetimes (Transient, Scoped, Singleton)
- Registering services
- Constructor injection
*/

// ============================================
// STEP 1: Interface and implementation
// ============================================

public interface IEmailService
{
    void Send(string to, string message);
}

public class SmtpEmailService : IEmailService
{
    public void Send(string to, string message) { /* ... */ }
}

// ============================================
// STEP 2: Registering in Program.cs
// ============================================

// builder.Services.AddScoped<IEmailService, SmtpEmailService>();

// ============================================
// STEP 3: Injecting
// ============================================

public class OrderService
{
    private readonly IEmailService _email;

    public OrderService(IEmailService email)
    {
        _email = email;
    }
}

/*
LINE-BY-LINE BREAKDOWN:

AddScoped
- New instance per HTTP request (web) or scope

Constructor injection
- .NET creates and gives you the dependency

NOOB TRANSLATION:

Instead of creating objects yourself with 'new', you ask .NET to give them to you.

COMMON MISTAKES:

1. Using 'new' inside classes instead of injecting.
2. Wrong lifetime causing memory leaks or bugs.
3. Not registering the service.

TRY CHANGING THIS:

1. Register a service with different lifetimes.
2. Inject the service into a class.

MINI CHALLENGE:

Create an interface ILogger and two implementations. Register one and inject it.
*/