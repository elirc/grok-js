/*
JUNIOR GOAL:
Implement production-grade logging with structured data, correlation, and proper log levels.

REAL WORLD USE CASE:
Distributed tracing, log aggregation (ELK, Seq, Application Insights), debugging production issues, and compliance auditing.

CONCEPTS COVERED:
- Structured logging (message templates)
- Log levels and filtering
- Correlation IDs / Activity
- Enrichers and scopes
- Serilog vs Microsoft.Extensions.Logging
*/

// ============================================
// STEP 1: Structured logging
// ============================================

_logger.LogInformation("Processing order {OrderId} for user {UserId}", orderId, userId);

// ============================================
// STEP 2: Correlation
// ============================================

using var scope = _logger.BeginScope("CorrelationId: {CorrelationId}", correlationId);

// ============================================
// STEP 3: Modern best practices
// ============================================

// Use Serilog or OpenTelemetry for serious applications
// Enrich with machine name, environment, version, etc.

/*
DEEPER BREAKDOWN:

Message templates allow log aggregators to index properties separately from the message text.

Scopes and Activity.Current help correlate logs across services.

JUNIOR PERSPECTIVE:

Good logging is one of the best investments you can make in a service. Bad logging makes production debugging painful.

COMMON PITFALLS IN PRODUCTION:

- Logging sensitive data (PII, tokens).
- Using string concatenation instead of structured templates.
- Wrong log levels (Info for errors, Debug for everything).
- Not adding correlation IDs in distributed systems.

EXPERIMENTS:

1. Add Serilog with console and file sinks + structured properties.
2. Propagate a correlation ID through an HTTP request using middleware.
3. Compare Microsoft logger vs Serilog output.

JUNIOR CHALLENGE:

Set up logging for a small API that:
- Logs every request with method, path, status, duration
- Includes correlation ID
- Has different log levels per environment
- Does not log sensitive fields
*/