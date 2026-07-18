/*
BEGINNER GOAL:
Serialize and deserialize objects to JSON and other formats.

REAL WORLD USE CASE:
API communication, saving configuration, caching.

CONCEPTS COVERED:
- System.Text.Json
- JsonSerializer
- Attributes for customization
*/

// ============================================
// STEP 1: Serialize
// ============================================

var product = new Product { Id = 1, Name = "Laptop" };
string json = JsonSerializer.Serialize(product);

// ============================================
// STEP 2: Deserialize
// ============================================

Product? restored = JsonSerializer.Deserialize<Product>(json);

/*
LINE-BY-LINE BREAKDOWN:

JsonSerializer.Serialize
- Turns object into JSON string

Deserialize
- Turns JSON string back into object

NOOB TRANSLATION:

Serialization = object → text
Deserialization = text → object

COMMON MISTAKES:

1. Not handling nulls properly.
2. Case sensitivity issues.
3. Forgetting to configure options (camelCase, etc.).

TRY CHANGING THIS:

1. Use JsonPropertyName attribute.
2. Serialize a list of objects.

MINI CHALLENGE:

Serialize and deserialize a list of users with custom property names.
*/