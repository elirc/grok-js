/*
Example: Nullable Reference Types and Pattern Matching
*/

#nullable enable

public string GetDisplayName(Person? p) =>
    p switch
    {
        { FirstName: var fn, LastName: var ln } when !string.IsNullOrEmpty(fn) 
            => $"{fn} {ln}",
        { FirstName: var fn } => fn ?? "Unknown",
        _ => "Unknown person"
    };

/*
The ? on the parameter tells the compiler that p may be null. Inside the switch we use property patterns to safely destructure.

Pattern matching with when clauses and property patterns replaces many if-else chains and is far more readable.

Enabling nullable reference types project-wide forces you to confront nulls at compile time instead of at runtime. A junior should treat non-nullable references as the default and only add ? when null is genuinely possible and handled.
*/
