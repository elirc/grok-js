/*
BEGINNER GOAL:
Use HttpClient to call web APIs from .NET.

REAL WORLD USE CASE:
Consuming REST APIs, microservices communication, external integrations.

CONCEPTS COVERED:
- HttpClient best practices
- Sending GET/POST
- JSON serialization
- Proper disposal / IHttpClientFactory
*/

// ============================================
// STEP 1: Basic usage (with IHttpClientFactory - recommended)
// ============================================

public class ApiClient
{
    private readonly HttpClient _http;

    public ApiClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<string> GetUserAsync(int id)
    {
        var response = await _http.GetAsync($"/users/{id}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}

// ============================================
// STEP 2: Posting JSON
// ============================================

var payload = new { Name = "Alex" };
var response = await _http.PostAsJsonAsync("/users", payload);

/*
LINE-BY-LINE BREAKDOWN:

EnsureSuccessStatusCode
- Throws if the response was not 2xx

PostAsJsonAsync
- Serializes the object to JSON and sends it

NOOB TRANSLATION:

HttpClient is your tool for talking to other services over HTTP.

COMMON MISTAKES:

1. Creating new HttpClient for every request (socket exhaustion).
2. Not using IHttpClientFactory.
3. Not checking response status.

TRY CHANGING THIS:

1. Add timeout configuration.
2. Deserialize the response to a typed object.

MINI CHALLENGE:

Create a service that calls a public API (like JSONPlaceholder) and deserializes the result into a model.
*/