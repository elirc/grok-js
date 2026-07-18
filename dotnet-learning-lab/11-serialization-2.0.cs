/*
JUNIOR GOAL:
Design robust serialization strategies for APIs and events with versioning and performance in mind.

REAL WORLD USE CASE:
REST/gRPC APIs, event sourcing, distributed caching, and configuration.

CONCEPTS COVERED:
- System.Text.Json source generators
- Polymorphic serialization securely
- Versioning strategies
- Custom converters
- AOT and trimming compatibility
*/

// ============================================
// STEP 1: Source generated serialization
// ============================================

[JsonSerializable(typeof(Order))]
[JsonSerializable(typeof(ApiResponse<Order>))]
internal partial class AppJsonContext : JsonSerializerContext;

string json = JsonSerializer.Serialize(order, AppJsonContext.Default.Order);

// ============================================
// STEP 2: Secure polymorphism
// ============================================

[JsonDerivedType(typeof(CreditCard), "cc")]
[JsonDerivedType(typeof(PayPal), "pp")]
public abstract record PaymentMethod;

/*
DEEPER BREAKDOWN:

Source generators eliminate reflection and enable Native AOT.

Polymorphic deserialization must be explicit for security (prevents gadget attacks).

JUNIOR PERSPECTIVE:

Serialization is a contract. Treat changes to serialized shape as breaking changes.

COMMON PITFALLS IN PRODUCTION:

- Using Newtonsoft.Json when System.Text.Json is sufficient.
- Allowing arbitrary type deserialization.
- Not handling versioning of events/payloads.

EXPERIMENTS:

1. Enable source generation and measure startup + throughput improvement.
2. Add a new derived type and see what happens at deserialization time.
3. Implement a custom converter for a domain type (e.g. Money).

JUNIOR CHALLENGE:

Design a versioned event serialization system:
- Every event has a Version and EventType
- Support evolving a payload over time without breaking old consumers
- Use source generators
- Provide both forward and backward compatibility strategies
*/