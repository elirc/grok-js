/*
Example: Understanding DI Lifetimes in .NET (Scoped, Singleton, Transient)
*/

using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddSingleton<ICache, MemoryCache>();          // one instance for app lifetime
services.AddScoped<IUnitOfWork, EfUnitOfWork>();       // one per request/scope
services.AddTransient<INotificationService, EmailService>(); // new every time

var provider = services.BuildServiceProvider();

// Within one scope the scoped service is the same instance
using var scope1 = provider.CreateScope();
var uow1a = scope1.ServiceProvider.GetRequiredService<IUnitOfWork>();
var uow1b = scope1.ServiceProvider.GetRequiredService<IUnitOfWork>();
Console.WriteLine(ReferenceEquals(uow1a, uow1b)); // true

/*
Singleton lives for the entire application. Be very careful with state.

Scoped is the most common for web requests. In ASP.NET Core each HTTP request gets its own scope, so you get one UnitOfWork per request.

Transient means a brand new instance is created every time it is requested. Use for lightweight, stateless services.

Choosing the wrong lifetime is a very common source of bugs (especially sharing DbContext across requests or capturing scoped services inside singletons).

A junior .NET engineer must understand these three lifetimes and the scope hierarchy.
*/
