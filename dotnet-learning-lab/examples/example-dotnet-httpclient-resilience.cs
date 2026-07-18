/*
Example: Resilient HttpClient with Polly (or built-in resilience)
*/

var client = new HttpClient();
var response = await client.GetAsync("/data");

// In real apps use IHttpClientFactory + resilience pipeline
// AddRetry, AddCircuitBreaker, AddTimeout, etc.

Console.WriteLine("Always wrap outbound HTTP with timeouts, retries, and circuit breakers.");

/*
Direct new HttpClient() is almost always wrong in production. Use IHttpClientFactory so sockets are managed correctly and policies can be centralized.

Resilience policies prevent cascading failures when a downstream service is slow or down.

A junior should never call third-party services without resilience and logging.
*/
