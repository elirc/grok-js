/*
JUNIOR GOAL:
Apply map, filter, reduce in complex data transformation pipelines, including chaining, performance, and combining with other methods.

REAL WORLD USE CASE:
- Transforming API responses into UI models
- Aggregating analytics data
- Building derived state from raw data
- Data normalization layers

CONCEPTS COVERED:
- Chaining transformations
- Reduce for complex aggregations
- Avoiding side effects in transformations
- When to extract into named functions
*/

// ============================================
// STEP 1: Transformation pipeline
// ============================================

const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true },
  { id: 2, name: 'Shirt', price: 29, category: 'clothing', inStock: false },
];

const expensiveInStockNames = products
  .filter(p => p.inStock && p.price > 50)
  .map(p => p.name.toUpperCase())
  .sort();

// ============================================
// STEP 2: Advanced reduce
// ============================================

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

// ============================================
// STEP 3: Composing with other methods
// ============================================

function getTotalValueByCategory(items) {
  return Object.entries(groupByCategory(items)).map(([category, list]) => ({
    category,
    total: list.reduce((sum, item) => sum + item.price, 0)
  }));
}

/*
DEEPER BREAKDOWN:

Chaining
- Very powerful but can hurt readability if too long.
- Consider extracting intermediate steps into well-named variables or functions.

Reduce accumulator
- Can build any structure: objects, arrays, primitives, Maps.

Side effects
- Never put console.log or mutations inside map/filter/reduce in production code.

JUNIOR PERSPECTIVE:

These three methods are your primary tools for data shaping.
Learn to read transformation chains quickly — it's a daily activity.

COMMON PITFALLS IN PRODUCTION:

1. Mutating inside reduce.
2. Over-chaining to the point where debugging is painful.
3. Using reduce when a simple loop or for...of would be clearer.

EXPERIMENTS:

1. Rewrite a complex reduce using a for loop and compare readability.
2. Build a function that computes statistics (min, max, avg, count) in one pass.

JUNIOR CHALLENGE:

Given an array of transactions (with amount, category, date), produce:
- Total spent per category this month
- Average transaction size
- List of categories with more than 5 transactions
Use only map, filter, reduce.
*/