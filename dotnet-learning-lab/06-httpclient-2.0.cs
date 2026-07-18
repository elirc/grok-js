/*
JUNIOR GOAL:
Use HttpClient correctly in production with proper lifetime management, resilience, and observability.

REAL WORLD USE CASE:
Calling internal and external APIs reliably in microservices architectures.

CONCEPTS COVERED:
- IHttpClientFactory and named/typed clients
- Polly for resilience (retry, circuit breaker)
- HttpClientHandler and SocketsHttpHandler
- Logging and correlation with HttpClient
*/

// ============================================
// STEP 1: Recommended usage
// ============================================

builder.Services.AddHttpClient("MyApi", client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
    client.Timeout = TimeSpan.FromSeconds(30);
})
.AddPolicyHandler(GetRetryPolicy());

// ============================================
// STEP 2: Resilience
// ============================================

static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy() =>
    HttpPolicyExtensions
        .HandleTransientHttpError()
        .WaitAndRetryAsync(3, retry => TimeSpan.FromSeconds(Math.Pow(2, retry)));

/*
DEEPER BREAKDOWN:

Never new HttpClient() in a loop or per request — it leads to socket exhaustion.

IHttpClientFactory manages the lifetime of HttpMessageHandler correctly.

Polly (or Polly.Extensions.Http) is the standard way to add resilience.

JUNIOR PERSPECTIVE:

HttpClient looks simple but has several sharp edges around connection management and resilience.

COMMON PITFALLS IN PRODUCTION:

- Creating HttpClient per request.
- Not setting reasonable timeouts.
- Not handling transient failures.
- Leaking DNS changes (use SocketsHttpHandler with PooledConnectionLifetime).

EXPERIMENTS:

1. Add retry and circuit breaker to an HttpClient.
2. Implement a typed HttpClient with custom handler for correlation IDs.
3. Observe connection usage with dotnet-counters or similar tools.

JUNIOR CHALLENGE:

Create a resilient API client for an external service that:
- Uses typed client pattern
- Has retry with exponential backoff + jitter
- Has circuit breaker
- Propagates correlation ID
- Logs request/response at appropriate levels (without logging secrets)
*/