/*
JUNIOR GOAL:
Build robust, environment-aware configuration systems that are secure and easy to validate.

REAL WORLD USE CASE:
Managing secrets, feature flags, multi-environment deployments, and strongly-typed configuration in production services.

CONCEPTS COVERED:
- Options pattern validation
- IConfiguration sources and precedence
- Secret management (User Secrets, Azure Key Vault, environment variables)
- Binding to records and validation with DataAnnotations or FluentValidation
*/

// ============================================
// STEP 1: Strongly typed + validation
// ============================================

public record DatabaseOptions
{
    [Required]
    public string ConnectionString { get; init; } = "";
    
    [Range(1, 100)]
    public int MaxPoolSize { get; init; } = 10;
}

// In Program.cs
builder.Services.AddOptions<DatabaseOptions>()
    .Bind(builder.Configuration.GetSection("Database"))
    .ValidateDataAnnotations()
    .ValidateOnStart();

// ============================================
// STEP 2: Secret handling
// ============================================

// Never commit secrets.
// Use dotnet user-secrets for local dev
// Use Azure Key Vault / AWS Secrets Manager / env vars in production

/*
DEEPER BREAKDOWN:

ValidateOnStart fails the application at startup if configuration is invalid — much better than failing later.

IConfiguration has a clear precedence: appsettings.json < appsettings.{env}.json < User Secrets < Environment Variables < Command line.

JUNIOR PERSPECTIVE:

Configuration is one of the most common sources of production incidents. Treat it as code and validate it early.

COMMON PITFALLS IN PRODUCTION:

- Hardcoding connection strings or API keys.
- Not validating configuration at startup.
- Relying on magic strings instead of strongly typed options.
- Leaking secrets in logs.

EXPERIMENTS:

1. Add validation to an existing options class and cause a startup failure.
2. Bind configuration to a record and use init-only properties.
3. Wire up Azure Key Vault as a configuration source.

JUNIOR CHALLENGE:

Create a configuration system for a multi-tenant application that:
- Has base settings + tenant overrides
- Validates all required values at startup
- Supports reloading when configuration changes (IConfigurationRoot.Reload)
- Uses records for immutability
*/