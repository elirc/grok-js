/*
Advanced Dependency Injection Examples in .NET (EXPANDED 3-5x)

Example 1: Lifetime registration
builder.Services.AddTransient<ITransient, TransientImpl>();
builder.Services.AddScoped<IScoped, ScopedImpl>();
builder.Services.AddSingleton<ISingleton, SingletonImpl>();

Example 2: Constructor injection (primary)
public class OrderService
{
    private readonly IRepository _repo;
    private readonly ILogger<OrderService> _logger;
    public OrderService(IRepository repo, ILogger<OrderService> logger)
    {
        _repo = repo; _logger = logger;
    }
}

Example 3: Options pattern + validation
builder.Services.Configure<AppOptions>(config.GetSection("App"));
builder.Services.AddSingleton<IValidateOptions<AppOptions>, AppOptionsValidator>();

public class MyService(IOptions<AppOptions> opts) { var max = opts.Value.Max; }

Example 4: Keyed services (.NET 8+)
builder.Services.AddKeyedScoped<INotifier, EmailNotifier>("email");
builder.Services.AddKeyedScoped<INotifier, SmsNotifier>("sms");

Example 5: Decorator pattern registration
// Manual or Scrutor library: builder.Services.Decorate<INotifier, LoggingNotifierDecorator>();

Example 6: Factory registration
builder.Services.AddScoped<IFoo>(sp =>
{
    var dep = sp.GetRequiredService<IDep>();
    return new Foo(dep, "extra");
});

Example 7: HttpClient + Typed client
builder.Services.AddHttpClient<GitHubClient>(c => c.BaseAddress = new Uri("..."));

EXPANDED PROBLEMS & EXERCISES (8):
1. Transient that logs creation time (proves new instance each time).
2. Use keyed services to pick notifier based on user preference.
3. Add decorator that times every call to a service method.
4. Register open generic: AddScoped(typeof(IRepo<>), typeof(EfRepo<>)).
5. Override a service in tests using WebApplicationFactory.
6. Show captive dependency problem (scoped inside singleton) and fix.
7. Property injection simulation (avoid usually).
8. Using IServiceScopeFactory for creating scopes manually.

Lots of comments explaining lifetimes impact on state, memory, and correctness.
*/
