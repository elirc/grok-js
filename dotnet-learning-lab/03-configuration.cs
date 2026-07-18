/*
BEGINNER GOAL:
Learn how to read configuration in .NET applications.

REAL WORLD USE CASE:
Database connection strings, API keys, feature flags, environment-specific settings.

CONCEPTS COVERED:
- appsettings.json
- IConfiguration
- Options pattern
- Environment variables
*/

// ============================================
// STEP 1: appsettings.json
// ============================================

// {
//   "ConnectionStrings": {
//     "Default": "Server=...;"
//   },
//   "AppSettings": {
//     "MaxRetries": 3
//   }
// }

// ============================================
// STEP 2: Inject IConfiguration
// ============================================

public class MyService
{
    private readonly IConfiguration _config;

    public MyService(IConfiguration config)
    {
        _config = config;
    }

    public void DoWork()
    {
        string conn = _config.GetConnectionString("Default");
    }
}

// ============================================
// STEP 3: Strong typed options (recommended)
// ============================================

public class AppOptions
{
    public int MaxRetries { get; set; }
}

// In Program.cs:
// builder.Services.Configure<AppOptions>(builder.Configuration.GetSection("AppSettings"));

/*
LINE-BY-LINE BREAKDOWN:

IConfiguration
- Reads from multiple sources (json, env vars, command line)

GetSection
- Navigates into nested configuration

Configure<T>
- Binds a section to a strongly typed class

NOOB TRANSLATION:

Configuration is how your app knows its settings without hardcoding them.

COMMON MISTAKES:

1. Hardcoding secrets in source code.
2. Not using the Options pattern for complex settings.
3. Forgetting to register configuration in DI.

TRY CHANGING THIS:

1. Add a new setting in appsettings.json and read it.
2. Bind settings to a class.

MINI CHALLENGE:

Create an options class for email settings and inject it into a service.
*/