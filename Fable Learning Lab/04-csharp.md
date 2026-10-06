# C# — 50 Problems for the CRUD Web Developer

Ordered easiest-first. Sections: Language Fundamentals (1–8), Classes & Objects (9–16),
Collections & LINQ (17–24), Robust Code (25–30), Async & HTTP (31–36), Building an
ASP.NET Core CRUD API (37–50).

Run problems 1–36 in a console app (`dotnet new console`, code goes in `Program.cs`
top-level statements) and 37–50 in a minimal API project (`dotnet new web`).

---

## Language Fundamentals

### 1. Variables, types, and `var`

**Problem:** Declare an `int`, `double`, `string`, `bool`, and `decimal` price. Then show
`var` inference and explain when C# requires the type to be known.

**Solution:**
```csharp
int quantity = 3;
double rating = 4.5;
string name = "Keyboard";
bool inStock = true;
decimal price = 49.99m;      // m suffix = decimal; ALWAYS use decimal for money
                             // (double has binary rounding errors: 0.1 + 0.2 != 0.3)

var total = price * quantity;   // var: compiler infers decimal — still fully typed!
// var x;                       // Error: var needs an initializer to infer from

Console.WriteLine($"{name}: {total}");
```
Unlike JavaScript, every C# variable has a fixed compile-time type — `var` is inference,
not dynamism (it's TypeScript's `let x = ...`, not JS's). The `decimal`-for-money rule
will matter in every commerce-ish app you build.

### 2. String interpolation and formatting

**Problem:** Given `name = "Mouse"`, `price = 19.991m`, produce
`"Mouse costs $19.99 (order #00042)"` using interpolation with format specifiers, for
order number 42.

**Solution:**
```csharp
string name = "Mouse";
decimal price = 19.991m;
int orderNumber = 42;

string label = $"{name} costs {price:C2} (order #{orderNumber:D5})";
Console.WriteLine(label);
// On a US-culture machine: "Mouse costs $19.99 (order #00042)"

// More format specifiers you'll actually use:
Console.WriteLine($"{0.8567:P1}");            // 85.7%  (percent; spacing varies by culture)
Console.WriteLine($"{1234567.891:N2}");       // 1,234,567.89 (thousands separators)
Console.WriteLine($"{DateTime.Now:yyyy-MM-dd}"); // 2026-07-02
```
`$"..."` is C#'s template literal. Format specifiers after a colon (`:C2` currency,
`:D5` zero-padded, `:N2` numeric, date patterns) replace manual string fiddling — learn
five of them and you've covered 95% of display formatting.

### 3. Methods and expression bodies

**Problem:** Write `ApplyDiscount(decimal price, int percent)` as a classic method, then
as an expression-bodied method, plus a `void` method `PrintReceipt(string item, decimal price)`.

**Solution:**
```csharp
// Classic block body
static decimal ApplyDiscount(decimal price, int percent)
{
    return price * (100 - percent) / 100m;
}

// Expression body — same thing, for one-liners
static decimal ApplyDiscountShort(decimal price, int percent) =>
    price * (100 - percent) / 100m;

static void PrintReceipt(string item, decimal price) =>
    Console.WriteLine($"{item}: {price:C2}");

PrintReceipt("Monitor", ApplyDiscount(200m, 15));  // Monitor: $170.00
```
C# methods declare parameter types *and* return type up front (`void` = returns nothing).
The `=>` expression body is the idiomatic form for short methods — you'll see it
everywhere in modern C# code, including properties and lambdas.

### 4. Conditionals, switch statements, and switch expressions

**Problem:** Write `ShippingCost(decimal subtotal)` with if/else (free ≥ $50, $5.99 ≥
$20, else $9.99), then `RoleLabel(string role)` as a modern switch *expression* with a
default.

**Solution:**
```csharp
static decimal ShippingCost(decimal subtotal)
{
    if (subtotal >= 50m) return 0m;
    if (subtotal >= 20m) return 5.99m;
    return 9.99m;
}

// switch EXPRESSION: returns a value, arrow per case, _ = default
static string RoleLabel(string role) => role switch
{
    "admin"  => "Administrator",
    "editor" => "Editor",
    "viewer" => "Read-only user",
    _        => "Unknown role",
};

Console.WriteLine(ShippingCost(30m));   // 5.99
Console.WriteLine(RoleLabel("admin"));  // Administrator
```
The switch expression (`value switch { pattern => result }`) is the modern replacement
for chains of `case`/`break` — concise, and the compiler warns when patterns don't cover
all cases. It pairs beautifully with enums (problem 16).

### 5. Loops and ranges

**Problem:** Sum an `int[] scores = { 85, 92, 78, 95, 60 }` with `foreach`, print indexed
lines with `for`, and note the LINQ one-liner that replaces the sum.

**Solution:**
```csharp
int[] scores = { 85, 92, 78, 95, 60 };

// foreach — default choice when you need each element
int total = 0;
foreach (int score in scores)
{
    total += score;
}
Console.WriteLine(total); // 410

// for — when you need the index
for (int i = 0; i < scores.Length; i++)
{
    Console.WriteLine($"#{i + 1}: {scores[i]}");
}

// The LINQ way (section 3 of this file):
Console.WriteLine(scores.Sum()); // 410
```
Same instincts as JavaScript: `foreach` ≈ `for...of`, and LINQ ≈ array methods. As with
JS, hand-rolled accumulator loops mostly disappear once you know LINQ — but you must be
able to read and write the explicit versions.

### 6. Arrays vs `List<T>`

**Problem:** Show why a growing collection needs `List<T>` instead of an array: create a
list of names, `Add`, `Remove`, check `Contains`, and get `Count`.

**Solution:**
```csharp
// Arrays are FIXED SIZE — great for known-length data
string[] fixedNames = new string[2];
fixedNames[0] = "Ada";
// fixedNames[2] = "X"; // IndexOutOfRangeException — can't grow

// List<T> grows and shrinks — the default collection for app code
List<string> names = new() { "Ada", "Grace" };  // new(): target-typed shorthand
names.Add("Linus");
names.Remove("Grace");

Console.WriteLine(names.Count);            // 2
Console.WriteLine(names.Contains("Ada"));  // True
Console.WriteLine(names[0]);               // "Ada" — same index syntax as arrays

foreach (string n in names) Console.WriteLine(n);
```
The `<T>` is a generic type parameter — `List<string>` can *only* hold strings, checked
at compile time (compare TypeScript's `string[]`). In CRUD code you'll return
`List<Product>` from repositories constantly; arrays appear mostly at boundaries.

### 7. `Dictionary<TKey, TValue>`

**Problem:** Build a stock dictionary (`product name → units`), add entries, update one,
safely read a missing key, and loop over pairs.

**Solution:**
```csharp
Dictionary<string, int> stock = new()
{
    ["mouse"] = 12,
    ["monitor"] = 0,
};

stock["cable"] = 34;      // add (or overwrite) via indexer
stock["mouse"] += 5;      // update

// Reading a MISSING key with stock["nope"] throws KeyNotFoundException.
// Safe pattern — TryGetValue:
if (stock.TryGetValue("keyboard", out int units))
    Console.WriteLine($"keyboard: {units}");
else
    Console.WriteLine("keyboard not stocked");   // this prints

foreach (var (name, count) in stock)             // tuple deconstruction
    Console.WriteLine($"{name}: {count}");
```
`Dictionary` is C#'s object-as-map / `Map` equivalent with O(1) lookups. `TryGetValue`
(the `out` parameter receives the value if found) is the idiomatic safe read — the same
role `??` fallbacks played in JavaScript.

### 8. Value types, reference types, and `string`

**Problem:** Predict the output, then explain the difference:

```csharp
int a = 1;      int b = a;      b = 99;
int[] xs = { 1 }; int[] ys = xs; ys[0] = 99;
Console.WriteLine($"{a} {xs[0]}");
```

**Solution:**
```csharp
// Prints: "1 99"

// int is a VALUE type: b = a copies the value. Changing b can't touch a.
// Arrays (and all classes) are REFERENCE types: ys = xs copies the REFERENCE —
// both names point at the same array, so ys[0] = 99 changes what xs sees too.

// string is a reference type but IMMUTABLE, so it behaves like a value:
string s1 = "hello";
string s2 = s1;
s2 = s2.ToUpper();          // ToUpper returns a NEW string
Console.WriteLine(s1);      // "hello" — unchanged
```
Value types (`int`, `double`, `bool`, `decimal`, structs) copy on assignment; reference
types (classes, arrays, lists) share. This is the same aliasing behavior you met in
JavaScript (shallow copy problems) — C# just makes the categories explicit.

---

## Classes & Objects

### 9. Your first class

**Problem:** Create a `Product` class with `Name` and `Price` properties and a
`Describe()` method; instantiate two products.

**Solution:**
```csharp
public class Product
{
    public string Name { get; set; } = "";   // auto-property with default
    public decimal Price { get; set; }

    public string Describe() => $"{Name} — {Price:C2}";
}

var mouse = new Product { Name = "Mouse", Price = 19.99m };  // object initializer
var cable = new Product { Name = "Cable", Price = 9.50m };

Console.WriteLine(mouse.Describe()); // Mouse — $19.99
Console.WriteLine(cable.Describe()); // Cable — $9.50
```
`{ get; set; }` auto-properties are C#'s standard public fields-with-a-future: they look
like fields but can later grow validation or computed logic without breaking callers.
The object-initializer syntax `new Product { ... }` mirrors a JS object literal.

### 10. Constructors and validation

**Problem:** Give `BankAccount` a constructor requiring an owner and an opening balance
(throw if negative), a read-only `Owner`, and a `Balance` only modifiable through
`Deposit`.

**Solution:**
```csharp
public class BankAccount
{
    public string Owner { get; }                  // get-only: set in constructor, then frozen
    public decimal Balance { get; private set; }  // readable by all, settable only inside

    public BankAccount(string owner, decimal openingBalance)
    {
        if (string.IsNullOrWhiteSpace(owner))
            throw new ArgumentException("Owner is required", nameof(owner));
        if (openingBalance < 0)
            throw new ArgumentOutOfRangeException(nameof(openingBalance),
                "Opening balance cannot be negative");

        Owner = owner;
        Balance = openingBalance;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
}

var acct = new BankAccount("Ada", 100m);
acct.Deposit(50m);
Console.WriteLine(acct.Balance);  // 150
// acct.Balance = 9999m;          // Error: setter is private
```
Constructors are where you enforce "an object can never exist in an invalid state."
Access modifiers do the rest: `get;` alone = immutable after construction,
`private set;` = mutable only via methods that guard their invariants. This
encapsulation is the class-based version of the closures you wrote in JavaScript.

### 11. Static members

**Problem:** Add a static counter to `Product` that tracks how many products were ever
created, plus a static helper `Cheapest(List<Product>)`.

**Solution:**
```csharp
public class Product
{
    public static int TotalCreated { get; private set; }  // one value for the CLASS

    public string Name { get; set; } = "";
    public decimal Price { get; set; }

    public Product() => TotalCreated++;

    public static Product? Cheapest(List<Product> products) =>
        products.OrderBy(p => p.Price).FirstOrDefault();
}

var a = new Product { Name = "Mouse", Price = 20m };
var b = new Product { Name = "Cable", Price = 8m };

Console.WriteLine(Product.TotalCreated);                       // 2 — on the type, not an instance
Console.WriteLine(Product.Cheapest(new List<Product> { a, b })?.Name); // Cable
```
`static` members belong to the type itself — one copy shared by everything. Use them for
counters, pure helper functions, and constants. Note `Product?` — the method can return
null for an empty list, and the type says so honestly (problem 25 digs into this).

### 12. Inheritance and `virtual`/`override`

**Problem:** Create `Vehicle` with a virtual `Describe()`, and `Car` / `Motorcycle`
subclasses that override it. Show polymorphism through a `List<Vehicle>`.

**Solution:**
```csharp
public class Vehicle
{
    public string Make { get; set; } = "";
    public virtual string Describe() => $"{Make} vehicle";   // virtual: may be overridden
}

public class Car : Vehicle
{
    public int Doors { get; set; }
    public override string Describe() => $"{Make} car with {Doors} doors";
}

public class Motorcycle : Vehicle
{
    public override string Describe() => $"{Make} motorcycle";
}

List<Vehicle> fleet = new()
{
    new Car { Make = "Toyota", Doors = 4 },
    new Motorcycle { Make = "Honda" },
};

foreach (var v in fleet)
    Console.WriteLine(v.Describe());
// Toyota car with 4 doors      <- the CAR's version ran, though v is typed Vehicle
// Honda motorcycle
```
Polymorphism: the variable's *compile-time* type is `Vehicle`, but the *runtime* object
decides which `Describe` runs. Use inheritance sparingly (prefer interfaces +
composition), but recognize it — framework base classes (`ControllerBase`, `DbContext`)
rely on it everywhere.

### 13. Interfaces

**Problem:** Define `INotifier` with `Send(string message)`, implement `EmailNotifier`
and `SmsNotifier`, and write an `OrderService` that depends only on the interface.

**Solution:**
```csharp
public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"EMAIL: {message}");
}

public class SmsNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}

public class OrderService
{
    private readonly INotifier _notifier;   // depends on the ABSTRACTION

    public OrderService(INotifier notifier) => _notifier = notifier;

    public void PlaceOrder(string item)
    {
        Console.WriteLine($"Order placed: {item}");
        _notifier.Send($"Your {item} order is confirmed!");
    }
}

new OrderService(new EmailNotifier()).PlaceOrder("Monitor");
new OrderService(new SmsNotifier()).PlaceOrder("Cable");   // swap without touching OrderService
```
Constructor injection of interfaces is *the* central pattern of ASP.NET Core — the
framework's dependency-injection container will do the `new`-ing for you (problem 41).
It's also what makes testing easy: hand `OrderService` a fake notifier.

### 14. Records

**Problem:** Define a `record` for a `Money(decimal Amount, string Currency)` value.
Demonstrate value equality, `with` expressions, and deconstruction — and say when to
prefer records over classes.

**Solution:**
```csharp
public record Money(decimal Amount, string Currency);

var a = new Money(10.00m, "USD");
var b = new Money(10.00m, "USD");

Console.WriteLine(a == b);          // True — records compare by VALUE
                                     // (two class instances would be != even with equal fields)

var c = a with { Amount = 12.50m }; // non-destructive mutation: copy with one change
Console.WriteLine(c);               // Money { Amount = 12.50, Currency = USD } — free ToString

var (amount, currency) = c;         // deconstruction
Console.WriteLine($"{amount} {currency}");
```
Records are immutable-by-default data carriers with value equality, a readable
`ToString`, and `with` (C#'s spread-with-overrides). Rule of thumb: **records for data**
(DTOs, API shapes, domain values), **classes for behavior and identity** (services,
entities with a database id).

### 15. Properties with logic and computed properties

**Problem:** Give an `Order` class a `Status` property that rejects invalid transitions
(can't leave `Shipped`), and a computed `Total` from its items.

**Solution:**
```csharp
public class OrderItem
{
    public decimal Price { get; set; }
    public int Qty { get; set; }
}

public class Order
{
    private string _status = "Pending";

    public string Status
    {
        get => _status;
        set
        {
            if (_status == "Shipped")
                throw new InvalidOperationException("Shipped orders cannot change status");
            _status = value;
        }
    }

    public List<OrderItem> Items { get; } = new();

    public decimal Total => Items.Sum(i => i.Price * i.Qty);   // computed each access
}

var order = new Order();
order.Items.Add(new OrderItem { Price = 10m, Qty = 2 });
order.Items.Add(new OrderItem { Price = 5m, Qty = 3 });
Console.WriteLine(order.Total);   // 35 — derived, never stored (no drift possible)
order.Status = "Shipped";
// order.Status = "Pending";      // InvalidOperationException
```
A full property (backing field + logic in `set`) upgrades an auto-property without
changing callers. `Total` as a `=>` get-only property is the "derived state" rule from
the React file wearing a C# suit: don't store what you can compute.

### 16. Enums

**Problem:** Model `OrderStatus` as an enum, use it in a switch expression, parse one
from a string safely, and list all values.

**Solution:**
```csharp
public enum OrderStatus
{
    Pending,
    Paid,
    Shipped,
    Cancelled,
}

static string Describe(OrderStatus status) => status switch
{
    OrderStatus.Pending   => "Awaiting payment",
    OrderStatus.Paid      => "Preparing shipment",
    OrderStatus.Shipped   => "On its way",
    OrderStatus.Cancelled => "Cancelled",
    _ => "Unknown",
};

var s = OrderStatus.Paid;
Console.WriteLine(Describe(s));                       // Preparing shipment

// Parsing user/API input safely:
if (Enum.TryParse<OrderStatus>("Shipped", out var parsed))
    Console.WriteLine(parsed);                        // Shipped

foreach (var value in Enum.GetValues<OrderStatus>())  // all members
    Console.WriteLine(value);
```
Enums are C#'s answer to TypeScript's literal unions: a closed set of named values,
checked at compile time. `TryParse` handles the untrusted-string boundary (query params,
JSON) without exceptions.

---

## Collections & LINQ

LINQ is C#'s `map`/`filter`/`reduce` — same ideas, different names. All examples use:

```csharp
public record Employee(string Name, string Dept, decimal Salary, int Age);

List<Employee> staff = new()
{
    new("Ada",   "Eng",   120_000m, 36),
    new("Grace", "Eng",   135_000m, 45),
    new("Linus", "Ops",    90_000m, 29),
    new("Mary",  "Sales",  85_000m, 52),
    new("Alan",  "Eng",   110_000m, 41),
};
```

### 17. `Where` and `Select`

**Problem:** Get (a) all engineers, (b) just the names of everyone earning over $100k,
(c) name+salary projections as anonymous objects.

**Solution:**
```csharp
// (a) Where = filter
var engineers = staff.Where(e => e.Dept == "Eng").ToList();

// (b) chain Where + Select (= map)
var highEarnerNames = staff
    .Where(e => e.Salary > 100_000m)
    .Select(e => e.Name)
    .ToList();                       // ["Ada", "Grace", "Alan"]

// (c) Select into an anonymous type — an inline projection
var summaries = staff.Select(e => new { e.Name, e.Salary }).ToList();
foreach (var s in summaries)
    Console.WriteLine($"{s.Name}: {s.Salary:C0}");
```
`e => e.Dept == "Eng"` is a lambda — identical concept to JS arrows. One key difference
from JS: LINQ queries are *lazy*; nothing runs until you enumerate (`ToList`, `foreach`).
Chain freely, materialize once at the end.

### 18. `OrderBy` and `ThenBy`

**Problem:** Sort staff by department, then by salary descending within each department.

**Solution:**
```csharp
var sorted = staff
    .OrderBy(e => e.Dept)
    .ThenByDescending(e => e.Salary)
    .ToList();

foreach (var e in sorted)
    Console.WriteLine($"{e.Dept,-6} {e.Name,-6} {e.Salary:C0}");
// Eng    Grace  $135,000
// Eng    Ada    $120,000
// Eng    Alan   $110,000
// Ops    Linus  $90,000
// Sales  Mary   $85,000
```
`OrderBy` + `ThenBy(Descending)` express multi-level sorts declaratively — no comparator
arithmetic like JavaScript's `(a, b) => ...`. LINQ ordering is also *stable* and never
mutates the source list (unlike JS `sort`!).

### 19. `First`, `FirstOrDefault`, `Single`

**Problem:** Find an employee named "Linus", handle a name that doesn't exist without an
exception, and explain when to use `Single` instead of `First`.

**Solution:**
```csharp
var linus = staff.First(e => e.Name == "Linus");        // throws if NO match

var nobody = staff.FirstOrDefault(e => e.Name == "Zed"); // null if no match
if (nobody is null)
    Console.WriteLine("Not found");                      // safe handling

// Single asserts there is EXACTLY one match — more than one throws too.
// Use it when duplicates would be a data bug you want to hear about loudly:
var onlyMary = staff.Single(e => e.Name == "Mary");
```
Choose deliberately: `First` = "give me one, I know it exists"; `FirstOrDefault` =
"might not exist, I'll check for null" (the repository `GetById` pattern);
`Single` = "exactly one or something is wrong." In CRUD apps, `FirstOrDefault` +
null-check is the everyday workhorse.

### 20. `Any`, `All`, `Count`

**Problem:** Answer three questions with LINQ: is anyone under 30? do all engineers earn
over $100k? how many people are in Eng?

**Solution:**
```csharp
bool anyoneUnder30 = staff.Any(e => e.Age < 30);
Console.WriteLine(anyoneUnder30);   // True (Linus, 29)

bool allEngWellPaid = staff
    .Where(e => e.Dept == "Eng")
    .All(e => e.Salary > 100_000m);
Console.WriteLine(allEngWellPaid);  // True

int engCount = staff.Count(e => e.Dept == "Eng");
Console.WriteLine(engCount);        // 3

// Performance nuance: to check existence, prefer Any() over Count() > 0 —
// Any stops at the first match; Count walks everything.
```
Direct cousins of JavaScript's `some`/`every`/`filter().length`. These predicates read
like the business question being asked — which is exactly what makes LINQ-heavy code
reviewable.

### 21. `GroupBy`

**Problem:** Group staff by department and print each department with its headcount and
average salary.

**Solution:**
```csharp
var byDept = staff
    .GroupBy(e => e.Dept)
    .Select(g => new
    {
        Dept = g.Key,                          // the grouping value
        Count = g.Count(),
        AvgSalary = g.Average(e => e.Salary),  // aggregates run per-group
    })
    .OrderByDescending(x => x.AvgSalary);

foreach (var d in byDept)
    Console.WriteLine($"{d.Dept}: {d.Count} people, avg {d.AvgSalary:C0}");
// Eng: 3 people, avg $121,667
// Ops: 1 people, avg $90,000
// Sales: 1 people, avg $85,000
```
`GroupBy` yields one group per key; each group is itself a sequence you can aggregate.
This one method replaces the manual reduce-into-buckets pattern you wrote in JavaScript
(problem 17 there) — and it's the shape of every "report by category" feature.

### 22. Aggregates: `Sum`, `Min`, `Max`, `Average`

**Problem:** Compute total payroll, the highest salary, the youngest age, and the average
Eng salary — then find the *employee* with the highest salary (not just the number).

**Solution:**
```csharp
Console.WriteLine(staff.Sum(e => e.Salary));      // 540000
Console.WriteLine(staff.Max(e => e.Salary));      // 135000
Console.WriteLine(staff.Min(e => e.Age));         // 29
Console.WriteLine(staff.Where(e => e.Dept == "Eng").Average(e => e.Salary)); // 121666.67

// The RECORD with the max value (not the value itself):
var topEarner = staff.MaxBy(e => e.Salary);
Console.WriteLine(topEarner?.Name);               // Grace
```
Aggregates take a selector so you rarely need `Select` first. `MaxBy`/`MinBy` answer the
"which row, not which value" question that otherwise tempts people into sort-then-first
(wasteful) or manual loops.

### 23. Method chaining: a real query

**Problem:** In one LINQ chain: engineers under 50, sorted by salary descending, take the
top 2, project to `"Name ($Salary)"` strings.

**Solution:**
```csharp
var topYoungEngineers = staff
    .Where(e => e.Dept == "Eng" && e.Age < 50)
    .OrderByDescending(e => e.Salary)
    .Take(2)
    .Select(e => $"{e.Name} ({e.Salary:C0})")
    .ToList();

foreach (var line in topYoungEngineers)
    Console.WriteLine(line);
// Grace ($135,000)
// Ada ($120,000)

// Take/Skip are also your pagination primitives:
var page2 = staff.OrderBy(e => e.Name).Skip(2).Take(2).ToList();
```
Read chains top-to-bottom like a sentence: filter → sort → limit → shape. `Skip`/`Take`
is exactly `slice`-based pagination from the JavaScript file — and when LINQ runs against
a database via Entity Framework, this same chain becomes SQL (`WHERE`, `ORDER BY`,
`OFFSET/FETCH`) automatically.

### 24. Projecting entities to DTOs

**Problem:** You must return employees from an API *without* exposing salaries. Define
`EmployeeDto(string Name, string Dept)` and map the list.

**Solution:**
```csharp
public record EmployeeDto(string Name, string Dept);

List<EmployeeDto> dtos = staff
    .Select(e => new EmployeeDto(e.Name, e.Dept))   // salary never leaves this method
    .ToList();

// often written as a reusable mapping function:
static EmployeeDto ToDto(Employee e) => new(e.Name, e.Dept);
var dtos2 = staff.Select(ToDto).ToList();
```
The entity→DTO projection is the single most common LINQ expression in real web APIs:
internal models carry everything; DTOs carry exactly what the client should see (compare
the TypeScript file's `Omit<User, "passwordHash">` — same idea, enforced at the mapping
instead of the type level). Keep DTOs as records: pure data, value equality, immutable.

---

## Robust Code

### 25. Nullable reference types

**Problem:** With `<Nullable>enable</Nullable>` (the default in new projects), show the
difference between `string` and `string?`, and three ways to handle a possible null.

**Solution:**
```csharp
string definitely = "hello";     // the compiler treats this as never-null
string? maybe = FindNickname(7); // ? declares "this CAN be null"

// Console.WriteLine(maybe.Length); // Warning: 'maybe' may be null here

// 1. Guard (preferred — explicit handling)
if (maybe is not null)
    Console.WriteLine(maybe.Length);

// 2. Null-conditional + null-coalescing (defaults)
Console.WriteLine(maybe?.Length ?? 0);
Console.WriteLine(maybe ?? "(no nickname)");

// 3. Null-forgiving ! — "trust me". Compiles, but crashes if you're wrong.
// Console.WriteLine(maybe!.Length);   // avoid unless you can PROVE it

static string? FindNickname(int userId) => userId == 1 ? "Ace" : null;
```
This is C#'s version of TypeScript's strict null checks, and the same discipline applies:
declare nullability honestly in signatures (`string?` for "might not exist"), narrow with
checks, and treat `!` like TypeScript's `!` — a last resort. `?.` and `??` work exactly
like their JS twins.

### 26. Exceptions: try/catch/finally and `throw`

**Problem:** Write `ParseQuantity(string input)` that throws `FormatException` with a
clear message for bad input, and a caller that catches specific exceptions before general
ones.

**Solution:**
```csharp
static int ParseQuantity(string input)
{
    if (!int.TryParse(input, out int qty))
        throw new FormatException($"'{input}' is not a whole number");
    if (qty <= 0)
        throw new ArgumentOutOfRangeException(nameof(input), "Quantity must be positive");
    return qty;
}

try
{
    Console.WriteLine(ParseQuantity("abc"));
}
catch (FormatException ex)                 // most specific first
{
    Console.WriteLine($"Bad format: {ex.Message}");
}
catch (Exception ex)                       // general last — order matters
{
    Console.WriteLine($"Unexpected: {ex.Message}");
    throw;                                 // rethrow what you can't handle —
                                           // `throw;` keeps the original stack trace
}
finally
{
    Console.WriteLine("Cleanup runs either way");
}
```
Catch specific exception types you can genuinely handle; let the rest bubble up
(`throw;`, never `throw ex;` which resets the stack trace). And notice `TryParse` inside:
for *expected* bad input, Try-methods beat exceptions — exceptions are for the
exceptional.

### 27. Custom exceptions

**Problem:** Create `NotFoundException(string resource, int id)` and use it in a
`GetProduct` method; catch it separately from other errors.

**Solution:**
```csharp
public class NotFoundException : Exception
{
    public string Resource { get; }
    public int Id { get; }

    public NotFoundException(string resource, int id)
        : base($"{resource} with id {id} was not found")
    {
        Resource = resource;
        Id = id;
    }
}

static Product GetProduct(int id)
{
    var product = _products.FirstOrDefault(p => p.Id == id);
    return product ?? throw new NotFoundException("Product", id);
}

try
{
    GetProduct(999);
}
catch (NotFoundException ex)
{
    Console.WriteLine($"404-worthy: {ex.Message}");   // becomes an HTTP 404 later
}
```
A domain-specific exception carries structured data (resource, id) and lets each layer
react appropriately — in problem 48 a middleware will translate exactly this exception
into an HTTP 404 response. Same design as the JavaScript custom-error classes, with
compile-time catch matching.

### 28. Generics: write your own

**Problem:** Write a generic `InMemoryStore<T>` class with an in-memory `List<T>`, `Add`,
`GetAll`, and a `FindWhere(Func<T, bool>)` — usable for any entity type.

**Solution:**
```csharp
public class InMemoryStore<T>
{
    private readonly List<T> _items = new();

    public void Add(T item) => _items.Add(item);

    public IReadOnlyList<T> GetAll() => _items.AsReadOnly();  // callers can't mutate

    public List<T> FindWhere(Func<T, bool> predicate) =>      // Func = typed callback
        _items.Where(predicate).ToList();
}

var products = new InMemoryStore<Product>();
products.Add(new Product { Name = "Mouse", Price = 20m });
products.Add(new Product { Name = "Cable", Price = 8m });

var cheap = products.FindWhere(p => p.Price < 10m);
Console.WriteLine(cheap.Count);   // 1

var names = new InMemoryStore<string>();   // same class, different T
names.Add("hello");
```
`Func<T, bool>` is a typed function value — "takes a T, returns bool" — which is how C#
passes lambdas around (JS callbacks with a signature). You already used generics as a
consumer (`List<T>`, `Dictionary<K,V>`); writing them yourself is the step toward the
repository in problems 39–40.

### 29. Extension methods

**Problem:** Add `.Truncate(max)` to `string` and `.WhereInStock()` to
`IEnumerable<Product>` — without modifying either type.

**Solution:**
```csharp
public static class StringExtensions
{
    // `this string` on the first parameter makes it an extension method
    public static string Truncate(this string value, int max) =>
        value.Length <= max ? value : value[..max] + "…";
}

public static class ProductExtensions
{
    public static IEnumerable<Product> WhereInStock(this IEnumerable<Product> products) =>
        products.Where(p => p.Stock > 0);
}

Console.WriteLine("A very long product description".Truncate(10)); // "A very lon…"

var available = allProducts.WhereInStock().OrderBy(p => p.Price).ToList();
```
Extension methods bolt helpers onto existing types — call-site syntax is indistinguishable
from real methods. This is exactly what LINQ is: `Where`, `Select`, and friends are all
extension methods on `IEnumerable<T>`. Use them for domain-flavored query vocabulary
(`WhereInStock`, `ActiveOnly`) that keeps call sites readable.

### 30. Tuples and multiple return values

**Problem:** Write `Validate(string email)` returning both a success flag and an error
message — without a custom class — and deconstruct the result.

**Solution:**
```csharp
static (bool IsValid, string? Error) Validate(string email)
{
    if (string.IsNullOrWhiteSpace(email)) return (false, "Email is required");
    if (!email.Contains('@'))             return (false, "Email must contain @");
    return (true, null);
}

var (isValid, error) = Validate("nope");   // deconstruct into locals
if (!isValid)
    Console.WriteLine(error);              // "Email must contain @"

var result = Validate("a@b.com");          // or keep it as one value
Console.WriteLine(result.IsValid);         // True — named members, not Item1/Item2
```
Named tuples are the lightweight "return two things" tool — perfect for
validate/try-style results inside a layer. When the pair crosses layer or API boundaries,
promote it to a record (`ValidationResult`) so it has a name and a home; tuples are for
short-range communication.

---

## Async & HTTP

### 31. `async`/`await` and `Task`

**Problem:** Write `async Task<string> FetchGreetingAsync()` that simulates a 500ms I/O
delay, and call it from an async `Main` context. What do `Task` and `Task<T>` mean?

**Solution:**
```csharp
static async Task<string> FetchGreetingAsync()
{
    await Task.Delay(500);          // non-blocking pause — the thread is freed
    return "Hello from the server";
}

// In Program.cs with top-level statements, you can await directly:
Console.WriteLine("Requesting…");
string greeting = await FetchGreetingAsync();
Console.WriteLine(greeting);
```
`Task` is C#'s Promise: `Task<string>` ≈ `Promise<string>`, `Task` (no result) ≈
`Promise<void>`. `await` unwraps it without blocking the thread — in a web server that
means the thread serves *other requests* while your database call is in flight, which is
why every ASP.NET handler you write will be `async`. Convention: async method names end
in `Async`.

### 32. Parallel tasks with `Task.WhenAll`

**Problem:** Given `LoadUserAsync` (300ms) and `LoadOrdersAsync` (400ms), load both in
~400ms instead of ~700ms, and get both results.

**Solution:**
```csharp
static async Task<string> LoadUserAsync()
{
    await Task.Delay(300);
    return "Ada";
}

static async Task<List<string>> LoadOrdersAsync()
{
    await Task.Delay(400);
    return new List<string> { "Order-1", "Order-2" };
}

// Start BOTH first (the work begins when the method is called)…
var userTask = LoadUserAsync();
var ordersTask = LoadOrdersAsync();

// …then await the combination: total ≈ the slowest, not the sum
await Task.WhenAll(userTask, ordersTask);

Console.WriteLine($"{userTask.Result}: {ordersTask.Result.Count} orders");
// (.Result is safe here — WhenAll guaranteed both completed)
```
Identical reasoning to JavaScript's `Promise.all` (that file, problem 28): independent
awaits in sequence are silent performance bugs. Note the two-step shape — *call* both
methods (starting the work), *then* await — awaiting each call inline would serialize
them.

### 33. `HttpClient`: GET and JSON deserialization

**Problem:** GET `https://jsonplaceholder.typicode.com/todos/1`, deserialize into a
`Todo` record, and handle HTTP errors.

**Solution:**
```csharp
using System.Net.Http.Json;   // adds GetFromJsonAsync etc.

public record Todo(int UserId, int Id, string Title, bool Completed);

using HttpClient client = new();   // console demo; in ASP.NET use IHttpClientFactory

try
{
    // One-liner: GET + status check + JSON deserialize (throws on non-2xx)
    Todo? todo = await client.GetFromJsonAsync<Todo>(
        "https://jsonplaceholder.typicode.com/todos/1");

    Console.WriteLine(todo?.Title);
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Request failed: {ex.Message}");
}
```
`GetFromJsonAsync<T>` bundles the whole fetch-check-parse ritual you hand-wrote in
JavaScript. Deserialization maps JSON's camelCase (`userId`) onto C#'s PascalCase
(`UserId`) case-insensitively by default with these helpers. The record `Todo` plays the
same role as a TypeScript interface for the response.

### 34. `HttpClient`: POST with a JSON body

**Problem:** POST a new post to `https://jsonplaceholder.typicode.com/posts` and read
back the created resource, checking the status code explicitly this time.

**Solution:**
```csharp
using System.Net.Http.Json;

public record CreatePost(string Title, string Body, int UserId);
public record PostResponse(int Id, string Title, string Body, int UserId);

using HttpClient client = new();

var response = await client.PostAsJsonAsync(
    "https://jsonplaceholder.typicode.com/posts",
    new CreatePost("Hello", "My first post", 1));   // serialized to JSON for you

Console.WriteLine((int)response.StatusCode);        // 201 (Created)

if (response.IsSuccessStatusCode)                   // the res.ok of C#
{
    var created = await response.Content.ReadFromJsonAsync<PostResponse>();
    Console.WriteLine($"Created id {created?.Id}"); // 101
}
else
{
    string problem = await response.Content.ReadAsStringAsync();
    Console.WriteLine($"Failed: {problem}");
}
```
`PostAsJsonAsync` = fetch with `method: "POST"` + `JSON.stringify` + the content-type
header, in one call. Separate request/response records reflect reality: what you send
(no id) differs from what you get back (id assigned) — the DTO discipline again.

### 35. `System.Text.Json` directly

**Problem:** Serialize an object to a JSON string (camelCase, indented) and deserialize
untrusted JSON safely, tolerating missing fields.

**Solution:**
```csharp
using System.Text.Json;

public record Settings(string Theme, int PageSize, List<string> Favorites);

var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // C# PascalCase <-> JSON camelCase
    WriteIndented = true,
};

// Serialize (JSON.stringify)
string json = JsonSerializer.Serialize(
    new Settings("dark", 25, new() { "home" }), options);
Console.WriteLine(json);
// { "theme": "dark", "pageSize": 25, "favorites": ["home"] }

// Deserialize (JSON.parse) — untrusted input, so guard it
try
{
    var parsed = JsonSerializer.Deserialize<Settings>(
        """{ "theme": "light" }""", options);       // missing fields -> defaults/null!
    Console.WriteLine(parsed?.Theme);               // light
    Console.WriteLine(parsed?.Favorites is null);   // True — validate before trusting
}
catch (JsonException)
{
    Console.WriteLine("Malformed JSON");
}
```
Deserialization only shape-checks what it can — missing properties silently become
defaults, so a "successfully parsed" object can still be half-empty. Validate required
fields after parsing (or use `required` properties to make the deserializer throw).
ASP.NET does this serialize/deserialize work automatically for request/response bodies —
this is what's under the hood.

### 36. `CancellationToken`

**Problem:** Write `SearchAsync(string term, CancellationToken ct)` that honors
cancellation, and cancel it after 200ms.

**Solution:**
```csharp
static async Task<string> SearchAsync(string term, CancellationToken ct)
{
    await Task.Delay(1000, ct);         // pass ct to every async call in the chain —
                                        // a canceled delay throws OperationCanceledException
    return $"Results for '{term}'";
}

using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(200));

try
{
    string results = await SearchAsync("mouse", cts.Token);
    Console.WriteLine(results);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Search canceled — user navigated away or timed out");
}
```
A `CancellationToken` is C#'s `AbortController`: it flows through your async call chain
so abandoned work (user closed the tab, request timed out) actually stops instead of
burning server resources. ASP.NET hands every endpoint a token wired to the HTTP
connection — accept it in your handlers and pass it down to the database calls.

---

## Building an ASP.NET Core CRUD API

The final fourteen problems build one project: a **Products API** (`dotnet new web`,
then run with `dotnet run` and test with a browser, `curl`, or the built-in Swagger UI if
you add it). Each problem adds a layer to `Program.cs` and friends.

### 37. Hello, minimal API

**Problem:** Create a web project whose `GET /` returns a JSON `{ status: "ok" }` and
`GET /time` returns the server time. Run it.

**Solution:**
```csharp
// Program.cs — this IS the whole web server
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => new { status = "ok" });          // objects auto-serialize to JSON
app.MapGet("/time", () => new { utc = DateTime.UtcNow });

app.Run();   // starts listening (URL prints in the console, e.g. http://localhost:5xxx)
```
```bash
dotnet run
curl http://localhost:5000/        # {"status":"ok"}
```
A minimal API maps routes directly to lambdas — the closest C# gets to Express. Return
an object and ASP.NET serializes it to JSON with a 200 status automatically. Everything
that follows builds on these two lines: `MapVerb(pattern, handler)`.

### 38. The model and the DTOs

**Problem:** Define the `Product` entity plus `CreateProductDto` / `UpdateProductDto` /
`ProductResponse` records, deciding which fields belong where.

**Solution:**
```csharp
// Models/Product.cs — the internal entity: everything the SERVER knows
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Contracts/ProductDtos.cs — what crosses the wire
public record CreateProductDto(string Name, decimal Price, int Stock);
// no Id/CreatedAt: the server assigns those — clients must not send them

public record UpdateProductDto(string? Name, decimal? Price, int? Stock);
// everything nullable: PATCH semantics, "only change what's present"

public record ProductResponse(int Id, string Name, decimal Price, int Stock, bool InStock);
// InStock is DERIVED for the client's convenience; internal fields could be omitted

public static class ProductMappings
{
    public static ProductResponse ToResponse(this Product p) =>
        new(p.Id, p.Name, p.Price, p.Stock, p.Stock > 0);
}
```
The same three-way split you built in TypeScript (problem 41 there): entity ≠ create
shape ≠ update shape ≠ response shape. The mapping extension method gives you one
audited place where internal data becomes public data.

### 39. The repository interface

**Problem:** Define `IProductRepository` with async CRUD methods, returning nullable
where "not found" is a normal outcome.

**Solution:**
```csharp
public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);      // null = not found (expected, not exceptional)
    Task<Product> CreateAsync(Product product);
    Task<bool> UpdateAsync(Product product);  // false = didn't exist
    Task<bool> DeleteAsync(int id);           // false = didn't exist
}
```
Interfaces first: the web layer will depend on this contract, never on a concrete
database. All methods are `Task`-returning even though our first implementation is
in-memory — so swapping in Entity Framework later (problem 49) changes zero signatures.
This mirrors the TypeScript `Repository<T>` exactly.

### 40. The in-memory implementation

**Problem:** Implement `InMemoryProductRepository` with an id counter and a lock for
thread safety (a web server handles requests concurrently!).

**Solution:**
```csharp
public class InMemoryProductRepository : IProductRepository
{
    private readonly List<Product> _products = new();
    private readonly object _lock = new();     // many requests may hit this at once
    private int _nextId = 1;

    public Task<List<Product>> GetAllAsync()
    {
        lock (_lock) return Task.FromResult(_products.ToList());  // copy out
    }

    public Task<Product?> GetByIdAsync(int id)
    {
        lock (_lock) return Task.FromResult(_products.FirstOrDefault(p => p.Id == id));
    }

    public Task<Product> CreateAsync(Product product)
    {
        lock (_lock)
        {
            product.Id = _nextId++;
            product.CreatedAt = DateTime.UtcNow;
            _products.Add(product);
            return Task.FromResult(product);
        }
    }

    public Task<bool> UpdateAsync(Product product)
    {
        lock (_lock)
        {
            var index = _products.FindIndex(p => p.Id == product.Id);
            if (index == -1) return Task.FromResult(false);
            _products[index] = product;
            return Task.FromResult(true);
        }
    }

    public Task<bool> DeleteAsync(int id)
    {
        lock (_lock) return Task.FromResult(_products.RemoveAll(p => p.Id == id) > 0);
    }
}
```
New concern for server-side code: **concurrency**. Two requests can call `CreateAsync`
simultaneously, so the id increment and list mutation are guarded by `lock`. (A real
database handles this for you — one of several reasons in-memory stores are only for
dev/tests.) `Task.FromResult` wraps synchronous work in the async contract.

### 41. Dependency injection registration

**Problem:** Register the repository so endpoints receive it automatically, and explain
singleton vs scoped vs transient.

**Solution:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// "When someone asks for IProductRepository, give them this one shared instance"
builder.Services.AddSingleton<IProductRepository, InMemoryProductRepository>();

var app = builder.Build();

// Handlers just declare a parameter of the interface type — DI supplies it:
app.MapGet("/api/products", async (IProductRepository repo) =>
    (await repo.GetAllAsync()).Select(p => p.ToResponse()));

app.Run();

// Lifetimes:
// AddSingleton — ONE instance forever.       Right here: the in-memory list IS the data.
// AddScoped    — one instance PER REQUEST.   The default for EF Core's DbContext.
// AddTransient — new instance EVERY TIME.    For cheap, stateless helpers.
```
This is problem 13's constructor injection, industrialized: you declare *what* you need
(the interface) and the container decides *which* implementation and *when to create it*.
When you switch to a database, you'll change this one registration line —
`AddScoped<IProductRepository, EfProductRepository>()` — and no endpoint changes.

### 42. Read endpoints: GET all and GET by id

**Problem:** Implement `GET /api/products` and `GET /api/products/{id}`, returning 404
with a proper problem body when the id doesn't exist.

**Solution:**
```csharp
app.MapGet("/api/products", async (IProductRepository repo) =>
    Results.Ok((await repo.GetAllAsync()).Select(p => p.ToResponse())));

app.MapGet("/api/products/{id:int}", async (int id, IProductRepository repo) =>
{
    var product = await repo.GetByIdAsync(id);

    return product is null
        ? Results.NotFound(new { message = $"Product {id} not found" })  // 404 + body
        : Results.Ok(product.ToResponse());                              // 200 + DTO
});
```
```bash
curl http://localhost:5000/api/products/1      # 200 {"id":1,...}
curl http://localhost:5000/api/products/999    # 404 {"message":"Product 999 not found"}
```
Route parameters bind by name (`{id:int}` → `int id` — the `:int` constraint rejects
`/products/abc` with a 404 before your code runs). `Results.*` makes status codes
explicit: the repository's `null` becomes the web layer's 404. Each layer speaks its own
language; the endpoint translates.

### 43. Create endpoint: POST with validation and 201

**Problem:** Implement `POST /api/products`: validate the DTO (name required, price > 0,
stock ≥ 0), return 400 with field errors, or 201 with a Location header.

**Solution:**
```csharp
static Dictionary<string, string[]> Validate(CreateProductDto dto)
{
    var errors = new Dictionary<string, string[]>();
    if (string.IsNullOrWhiteSpace(dto.Name))
        errors["name"] = new[] { "Name is required" };
    else if (dto.Name.Length > 100)
        errors["name"] = new[] { "Name must be 100 characters or fewer" };
    if (dto.Price <= 0)
        errors["price"] = new[] { "Price must be greater than zero" };
    if (dto.Stock < 0)
        errors["stock"] = new[] { "Stock cannot be negative" };
    return errors;
}

app.MapPost("/api/products", async (CreateProductDto dto, IProductRepository repo) =>
{
    var errors = Validate(dto);
    if (errors.Count > 0)
        return Results.ValidationProblem(errors);      // 400 + standard problem format

    var product = new Product { Name = dto.Name.Trim(), Price = dto.Price, Stock = dto.Stock };
    var created = await repo.CreateAsync(product);

    // 201 Created + Location: /api/products/{id} + the new resource in the body
    return Results.Created($"/api/products/{created.Id}", created.ToResponse());
});
```
The JSON body binds to `CreateProductDto` automatically (problem 35's machinery).
REST conventions carried by this handler: **400** with field-keyed errors for bad input
(the same shape your React form consumed!), **201** — not 200 — for creation, plus a
`Location` header pointing at the new resource.

### 44. Update endpoint: PUT/PATCH semantics

**Problem:** Implement `PUT /api/products/{id}` applying an `UpdateProductDto` with
patch semantics (only non-null fields change), handling 404 and validation.

**Solution:**
```csharp
app.MapPut("/api/products/{id:int}",
    async (int id, UpdateProductDto dto, IProductRepository repo) =>
{
    var existing = await repo.GetByIdAsync(id);
    if (existing is null)
        return Results.NotFound(new { message = $"Product {id} not found" });

    // apply only the provided fields (nulls mean "leave alone")
    if (dto.Name is not null)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return Results.ValidationProblem(new Dictionary<string, string[]>
                { ["name"] = new[] { "Name cannot be empty" } });
        existing.Name = dto.Name.Trim();
    }
    if (dto.Price is not null)
    {
        if (dto.Price <= 0)
            return Results.ValidationProblem(new Dictionary<string, string[]>
                { ["price"] = new[] { "Price must be greater than zero" } });
        existing.Price = dto.Price.Value;    // .Value unwraps decimal? -> decimal
    }
    if (dto.Stock is not null) existing.Stock = dto.Stock.Value;

    await repo.UpdateAsync(existing);
    return Results.Ok(existing.ToResponse());
});
```
The nullable DTO fields implement "absent means unchanged" — the PATCH semantics you
typed in TypeScript (problem 20 there). Note the order of checks: existence first (404),
then validation (400), then the write — a consistent ladder every update endpoint
follows.

### 45. Delete endpoint and status codes

**Problem:** Implement `DELETE /api/products/{id}` returning 204 on success and 404
otherwise — and justify why 204 has no body.

**Solution:**
```csharp
app.MapDelete("/api/products/{id:int}", async (int id, IProductRepository repo) =>
{
    bool deleted = await repo.DeleteAsync(id);

    return deleted
        ? Results.NoContent()                                        // 204: done, nothing to say
        : Results.NotFound(new { message = $"Product {id} not found" });
});
```
Your API now speaks the full status-code vocabulary a frontend expects:

| Code | Meaning | Used by |
|------|---------|---------|
| 200 | OK, here's the data | GET, PUT |
| 201 | Created (+ Location) | POST |
| 204 | Success, no body | DELETE |
| 400 | Your input was invalid (field errors) | POST, PUT |
| 404 | That id doesn't exist | GET, PUT, DELETE |
| 500 | We broke (problem 48) | anywhere |

204 means "succeeded, nothing to return" — the deleted resource is gone, so echoing it
back would be a lie waiting to happen. (Remember your JS api client skipping `res.json()`
on 204? This is the other side of that handshake.)

### 46. Query parameters: filtering, sorting, paging

**Problem:** Extend `GET /api/products` with `?search=`, `?minPrice=`, `?sortBy=`
(name|price), `?page=`, `?pageSize=` — returning a paginated envelope.

**Solution:**
```csharp
public record PagedResponse<T>(List<T> Items, int Page, int PageSize, int TotalItems, int TotalPages);

app.MapGet("/api/products", async (
    IProductRepository repo,
    string? search, decimal? minPrice, string? sortBy,
    int page = 1, int pageSize = 10) =>            // optional params with defaults
{
    var query = (await repo.GetAllAsync()).AsEnumerable();

    if (!string.IsNullOrWhiteSpace(search))
        query = query.Where(p => p.Name.Contains(search, StringComparison.OrdinalIgnoreCase));
    if (minPrice is not null)
        query = query.Where(p => p.Price >= minPrice);

    query = sortBy?.ToLower() switch
    {
        "price" => query.OrderBy(p => p.Price),
        "name"  => query.OrderBy(p => p.Name),
        _       => query.OrderBy(p => p.Id),
    };

    var items = query.ToList();
    pageSize = Math.Clamp(pageSize, 1, 100);       // never let a client ask for 1,000,000
    var totalPages = Math.Max(1, (int)Math.Ceiling(items.Count / (double)pageSize));
    page = Math.Clamp(page, 1, totalPages);

    var pageItems = items
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(p => p.ToResponse())
        .ToList();

    return Results.Ok(new PagedResponse<ProductResponse>(
        pageItems, page, pageSize, items.Count, totalPages));
});
```
```bash
curl "http://localhost:5000/api/products?search=mou&sortBy=price&page=1&pageSize=5"
```
Simple method parameters bind from the query string automatically. Everything here is a
reunion: LINQ chains (23), pagination math with clamping (JS 41, React 32), and the
`PagedResponse<T>` envelope you typed in TypeScript (46). Clamping `pageSize` is a
server's self-defense — never trust client-supplied limits.

### 47. The service layer

**Problem:** Endpoints are getting fat. Extract a `ProductService` holding
validation + business rules, leaving endpoints as thin translators.

**Solution:**
```csharp
public record ServiceResult<T>(T? Value, Dictionary<string, string[]>? Errors, bool NotFound = false)
{
    public bool Ok => Errors is null && !NotFound;
    public static ServiceResult<T> Success(T value) => new(value, null);
    public static ServiceResult<T> Invalid(Dictionary<string, string[]> errors) => new(default, errors);
    public static ServiceResult<T> Missing() => new(default, null, NotFound: true);
}

public class ProductService(IProductRepository repo)   // primary constructor
{
    public async Task<ServiceResult<ProductResponse>> CreateAsync(CreateProductDto dto)
    {
        var errors = Validate(dto);
        if (errors.Count > 0) return ServiceResult<ProductResponse>.Invalid(errors);

        var product = new Product { Name = dto.Name.Trim(), Price = dto.Price, Stock = dto.Stock };
        var created = await repo.CreateAsync(product);
        return ServiceResult<ProductResponse>.Success(created.ToResponse());
    }
    // UpdateAsync / DeleteAsync follow the same pattern…

    private static Dictionary<string, string[]> Validate(CreateProductDto dto) { /* problem 43 */ return new(); }
}

// Register it:  builder.Services.AddSingleton<ProductService>();

// The endpoint shrinks to pure HTTP translation:
app.MapPost("/api/products", async (CreateProductDto dto, ProductService service) =>
{
    var result = await service.CreateAsync(dto);
    return result switch
    {
        { Ok: true }         => Results.Created($"/api/products/{result.Value!.Id}", result.Value),
        { NotFound: true }   => Results.NotFound(),
        _                    => Results.ValidationProblem(result.Errors!),
    };
});
```
The architecture is now **endpoint (HTTP) → service (rules) → repository (data)** — the
same three layers as your React app's component → hook → api module, meeting in the
middle at HTTP. `ServiceResult` is the discriminated-union outcome from TypeScript
problem 50, expressed with C# records and pattern matching.

### 48. Global error handling middleware

**Problem:** An unhandled exception currently returns an ugly stack trace (or a blank
500). Add middleware that logs it and returns a clean JSON problem — and maps
`NotFoundException` to 404.

**Solution:**
```csharp
app.Use(async (context, next) =>
{
    try
    {
        await next(context);                       // run the rest of the pipeline
    }
    catch (NotFoundException ex)                   // domain exception -> 404 (problem 27!)
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        await context.Response.WriteAsJsonAsync(new { message = ex.Message });
    }
    catch (Exception ex)                           // everything else -> sanitized 500
    {
        app.Logger.LogError(ex, "Unhandled exception for {Path}", context.Request.Path);
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(new
        {
            message = "An unexpected error occurred.",  // details go to logs, NOT clients
            traceId = context.TraceIdentifier,          // correlate user reports with logs
        });
    }
});
```
Middleware wraps every request like an onion — this one try/catch covers all fifty
endpoints you'll ever add, so individual handlers stay clean. Two production rules baked
in: never leak internals (stack traces reveal your structure to attackers), and always
log with a correlation id so "it broke at 3pm" is findable.

### 49. Swapping in a real database (EF Core)

**Problem:** Sketch the Entity Framework Core version: a `DbContext`, the repository
implementation, and the registration change — showing what does *not* change.

**Solution:**
```csharp
// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();   // ~ a table
}

public class EfProductRepository(AppDbContext db) : IProductRepository
{
    public Task<List<Product>> GetAllAsync() =>
        db.Products.AsNoTracking().ToListAsync();        // LINQ -> SQL!

    public Task<Product?> GetByIdAsync(int id) =>
        db.Products.FirstOrDefaultAsync(p => p.Id == id);

    public async Task<Product> CreateAsync(Product product)
    {
        product.CreatedAt = DateTime.UtcNow;
        db.Products.Add(product);
        await db.SaveChangesAsync();                     // INSERT + id populated
        return product;
    }

    public async Task<bool> UpdateAsync(Product product)
    {
        db.Products.Update(product);
        return await db.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await GetByIdAsync(id);
        if (product is null) return false;
        db.Products.Remove(product);
        return await db.SaveChangesAsync() > 0;
    }
}

// Program.cs — the ONLY other lines that change:
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite("Data Source=app.db"));
builder.Services.AddScoped<IProductRepository, EfProductRepository>();  // scoped now!
```
The payoff of problem 39's interface: endpoints, service, DTOs, validation, middleware —
all untouched. The same LINQ you learned on lists (`Where`, `OrderBy`, `Skip/Take`) now
compiles to SQL. Note the lifetime change: `DbContext` is per-request (`AddScoped`), so
the repository must be too.

### 50. Capstone: the whole request, traced

**Problem:** Assemble the final `Program.cs` and trace one request —
`POST /api/products` with an invalid body, then a valid one — through every layer you
built.

**Solution:**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite("Data Source=app.db"));
builder.Services.AddScoped<IProductRepository, EfProductRepository>();   // problem 49
builder.Services.AddScoped<ProductService>();                            // problem 47

var app = builder.Build();

app.Use(ErrorHandling.Middleware);                                       // problem 48

app.MapGet("/api/products", ProductEndpoints.List);                      // problem 46
app.MapGet("/api/products/{id:int}", ProductEndpoints.GetById);          // problem 42
app.MapPost("/api/products", ProductEndpoints.Create);                   // problems 43/47
app.MapPut("/api/products/{id:int}", ProductEndpoints.Update);           // problem 44
app.MapDelete("/api/products/{id:int}", ProductEndpoints.Delete);        // problem 45

app.Run();
```
**Trace — invalid request** `POST {"name":"","price":-5}`:
middleware lets it through → JSON binds to `CreateProductDto` → endpoint calls
`ProductService.CreateAsync` → validation returns field errors → `ServiceResult.Invalid`
→ endpoint pattern-matches to `Results.ValidationProblem` → **400** with
`{ "errors": { "name": [...], "price": [...] } }` — the exact shape your React form
(React file, problem 26) renders under each input.

**Trace — valid request** `POST {"name":"Keyboard","price":49.99,"stock":10}`:
binds → validates clean → service builds the entity → `EfProductRepository.CreateAsync`
→ EF Core issues `INSERT`, SQLite assigns the id → entity maps `ToResponse()` →
**201 Created**, `Location: /api/products/1` → your React `useUsers`-style hook appends
it to state → the table re-renders.

That's the full stack in your own code: **React component → custom hook → fetch client
→ HTTP → middleware → endpoint → service → repository → database** — and every piece of
it came from a problem in these four files. You're no longer learning to code; you're
learning to ship. Build something.
