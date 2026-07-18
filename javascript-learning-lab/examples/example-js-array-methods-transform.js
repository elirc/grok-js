/*
Example: Declarative Array Transformations with map, filter, and reduce

Moving from imperative loops to declarative pipelines.
*/

const products = [
  { id: 1, name: "Laptop", price: 999, inStock: true, category: "electronics" },
  { id: 2, name: "Book", price: 15, inStock: true, category: "books" },
  { id: 3, name: "Phone", price: 599, inStock: false, category: "electronics" },
  { id: 4, name: "Desk", price: 250, inStock: true, category: "furniture" }
];

// Get names of in-stock electronics under $1000
const affordableElectronics = products
  .filter(p => p.inStock && p.category === "electronics" && p.price < 1000)
  .map(p => p.name);

console.log("Affordable in-stock electronics:", affordableElectronics);

// Calculate total value of in-stock items
const totalValue = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);

console.log("Total value of stock:", totalValue);

// Group by category using reduce
const byCategory = products.reduce((groups, product) => {
  const cat = product.category;
  if (!groups[cat]) groups[cat] = [];
  groups[cat].push(product.name);
  return groups;
}, {});

console.log("Grouped:", byCategory);

/*
The filter call keeps only the elements for which the predicate returns true. It creates a brand new array; the original products array is untouched. This is important for functional programming style and for React-style immutable updates.

The subsequent map transforms each remaining item into just its name. Because map also returns a new array, we get a clean list of strings without ever mutating the source data.

The reduce is the most powerful of the three. It takes an accumulator (starting at 0 here) and each item, and produces a single final value. In the grouping example we use the accumulator as an object that we mutate locally inside the reducer (this is a common and acceptable pattern when the accumulator itself is the new data structure being built).

A junior reading this should notice that the entire pipeline reads almost like English: "take the products, filter the ones that are in stock electronics under 1000, then map to their names." This declarative style makes the intent much clearer than a traditional for loop with several if statements and a push.

Performance note: these methods create intermediate arrays. For very large collections or hot paths you may later optimize with a single for loop, but readability usually wins for business logic.
*/
