/*
JUNIOR GOAL:
Design dependency injection setups that are maintainable, testable, and avoid common anti-patterns in larger .NET applications.

REAL WORLD USE CASE:
Building loosely coupled services, supporting multiple implementations (e.g., email providers), and enabling unit testing with mocks.

CONCEPTS COVERED:
- Service lifetimes and their implications (Scoped is king in web apps)
- Composition root
- Service locator anti-pattern
- Keyed services ( .NET 8+ )
- Decorators and interception
*/

// ============================================
// STEP 1: Understanding lifetimes
// ============================================

// Transient  → new instance every time
// Scoped     → one per request / scope (recommended default for web)
// Singleton  → one for the lifetime of the app

// ============================================
// STEP 2: Captive dependency problem
// ============================================

// Bad: injecting Scoped into Singleton
// This can cause stale data or memory leaks

// ============================================
// STEP 3: Modern keyed services
// ============================================

// builder.Services.AddKeyedScoped<IEmailSender, SmtpEmailSender>("smtp");
// builder.Services.AddKeyedScoped<IEmailSender, SendGridEmailSender>("sendgrid");

// var sender = serviceProvider.GetRequiredKeyedService<IEmailSender>("smtp");

/*
DEEPER BREAKDOWN:

The composition root is the only place that should know about concrete implementations.

Scoped services are disposed at the end of the scope — this is why DbContext is usually Scoped.

Keyed services (new in .NET 8) solve the "multiple implementations of the same interface" problem cleanly.

JUNIOR PERSPECTIVE:

Good DI makes your code testable and flexible.
Bad DI (service locator, captive dependencies, wrong lifetimes) creates hard-to-debug runtime issues.

COMMON PITFALLS IN PRODUCTION:

- Captive dependencies (longer-lived service holding shorter-lived ones).
- Using IServiceProvider as a service locator inside classes.
- Registering everything as Singleton for "performance".
- Forgetting to register implementations.

EXPERIMENTS:

1. Create a service with the wrong lifetime and observe the bug it causes.
2. Implement a decorator using DI (e.g., logging decorator around a service).
3. Use keyed services to support multiple payment providers.

JUNIOR CHALLENGE:

Design the DI registration for a system that has:
- Multiple notification channels (Email, SMS, Push)
- A default + per-tenant overrides
- Decorators for logging and retry
- Proper lifetimes

Document the choices and potential problems.
*/