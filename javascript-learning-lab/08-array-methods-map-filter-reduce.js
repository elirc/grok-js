/*
BEGINNER GOAL:
Learn the three most powerful array methods: map, filter, and reduce.
These methods let you transform, select, and summarize data from arrays without writing manual loops.

REAL WORLD USE CASE:
These methods appear in almost every real app:
- map: Turn a list of users into just their names for a dropdown
- filter: Show only products that are on sale, or only todos that are not done
- reduce: Calculate the total price of everything in a shopping cart
- Combine them: Get names of users who are over 18 and active

CONCEPTS COVERED:
- .map() - transform every item and get a new array
- .filter() - keep only items that match a condition
- .reduce() - combine all items into a single value
- Arrow functions used as callbacks (basic)
- How these methods do NOT change the original array
- Chaining methods together
*/

// ============================================
// STEP 1: Understanding .map()
// ============================================

// .map() runs a function on every item in an array.
// It returns a NEW array with the results.

let numbers = [1, 2, 3, 4, 5];

// We want to create a new array with each number doubled.
let doubled = numbers.map(function(number) {
  return number * 2;
});

console.log("Original numbers:", numbers); // [1, 2, 3, 4, 5]
console.log("Doubled numbers:", doubled);  // [2, 4, 6, 8, 10]

// The original array is NOT changed.
// map always gives you back a brand new array.

// Real example: get just the names from user objects
let users = [
  { id: 1, name: "Alex", age: 25 },
  { id: 2, name: "Sam", age: 31 },
  { id: 3, name: "Jordan", age: 19 }
];

// users.map takes each user object and returns only the name
let names = users.map(function(user) {
  // user is the current item in the array
  // user.name gets the "name" property from that object
  return user.name;
});

console.log("Just the names:", names);
// Output: ["Alex", "Sam", "Jordan"]

// ============================================
// STEP 2: Using .filter()
// ============================================

// .filter() goes through each item.
// If your function returns true, the item is kept.
// If your function returns false, the item is thrown away.
// It returns a NEW array.

let products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 29, inStock: false },
  { name: "Keyboard", price: 79, inStock: true },
  { name: "Monitor", price: 199, inStock: true }
];

// Keep only products that are in stock
let inStockProducts = products.filter(function(product) {
  // product is the current item
  // We return true or false based on the condition
  return product.inStock === true;
});

console.log("In stock products:", inStockProducts);

// Another filter: only products under $100
let cheapProducts = products.filter(function(product) {
  return product.price < 100;
});

console.log("Cheap products:", cheapProducts);

// ============================================
// STEP 3: Using .reduce()
// ============================================

// .reduce() is used when you want to turn the whole array into ONE value.
// Common uses: sum, count, build a new object, find maximum, etc.

let cartPrices = [29.99, 15.50, 49.00];

// reduce takes two arguments:
// 1. A function with (accumulator, currentItem)
// 2. The starting value

let total = cartPrices.reduce(function(accumulator, currentPrice) {
  // accumulator holds the running total so far
  // currentPrice is the item we are looking at right now
  return accumulator + currentPrice;
}, 0); // 0 is the starting value

console.log("Cart total:", total);
// How it works step by step:
// Start: accumulator = 0
// First item: 0 + 29.99 = 29.99
// Second item: 29.99 + 15.50 = 45.49
// Third item: 45.49 + 49.00 = 94.49
// Final result: 94.49

// ============================================
// STEP 4: A bigger real-world example
// ============================================

let orders = [
  { id: 1, customer: "Alex", amount: 120, status: "completed" },
  { id: 2, customer: "Sam", amount: 45, status: "pending" },
  { id: 3, customer: "Jordan", amount: 200, status: "completed" },
  { id: 4, customer: "Taylor", amount: 75, status: "completed" }
];

// Get only completed orders
let completedOrders = orders.filter(function(order) {
  return order.status === "completed";
});

// Get just the amounts of completed orders using map
let completedAmounts = completedOrders.map(function(order) {
  return order.amount;
});

// Sum all the completed amounts using reduce
let totalCompleted = completedAmounts.reduce(function(sum, amount) {
  return sum + amount;
}, 0);

console.log("Total from completed orders: $" + totalCompleted);

// ============================================
// STEP 5: Method chaining (doing several things in a row)
// ============================================

// You can chain map, filter, reduce together.

let allUsers = [
  { name: "Alex", age: 25, active: true },
  { name: "Sam", age: 17, active: true },
  { name: "Jordan", age: 32, active: false },
  { name: "Taylor", age: 21, active: true }
];

// Get names of active users who are 18 or older
let adultActiveUserNames = allUsers
  .filter(function(user) {
    return user.active === true && user.age >= 18;
  })
  .map(function(user) {
    return user.name;
  });

console.log("Active adults:", adultActiveUserNames);
// Output: ["Alex", "Taylor"]

/*
LINE-BY-LINE BREAKDOWN:

let doubled = numbers.map(function(number) {
- .map is called on the numbers array
- We pass it a function as an argument
- This function will run once for every item in the array
- The parameter "number" will be given the current item each time

return number * 2;
- Inside the function we return the transformed value
- Whatever we return becomes an element in the new array

let inStockProducts = products.filter(function(product) {
- filter also takes a function
- The function must return true or false
- Only items where the function returns true are kept

return product.inStock === true;
- This is the test
- product is the current item being checked
- If true → item stays in the new array
- If false → item is discarded

cartPrices.reduce(function(accumulator, currentPrice) {
- reduce is different: it builds up ONE final result
- accumulator is like a running total or result
- currentPrice (or current item) is the next value to consider
- The second argument to reduce (0) is the initial value of accumulator

allUsers.filter(...).map(...)
- We can chain methods because each one returns a new array
- filter returns an array → map can be called on it immediately
- This is very common in real code

NOOB TRANSLATION:

map = "Take every item and turn it into something else"
- Like having a list of people and making a list of just their ages

filter = "Keep only the items I want"
- Like going through your closet and keeping only the blue shirts

reduce = "Smush the whole list into one single thing"
- Like adding up the prices of everything in your cart
- Or counting how many items match a rule

These methods are like having magical assistants that walk through your list and do work for you.

COMMON MISTAKES:

1. Forgetting to return inside map, filter, or reduce
   - If you don't return, you get undefined in the results

2. Thinking that map/filter/reduce change the original array
   - They never do. They always create new arrays (except reduce which creates one value)

3. Using the wrong parameter name and getting confused
   - The parameter name (user, product, item) is just a name you choose

4. Trying to use these methods on objects (they only work on arrays)

5. Forgetting the initial value in reduce (the , 0 part)

TRY CHANGING THIS:

1. Use map on an array of numbers to create an array of their squares.

2. Use filter on the products array to get only items that cost more than 100.

3. Use reduce to count how many users in allUsers are active (hint: start with 0 and add 1 each time the condition is met).

MINI CHALLENGE:

You have this array:
let books = [
  { title: "JS Basics", pages: 120, read: true },
  { title: "Advanced JS", pages: 340, read: false },
  { title: "You Don't Know JS", pages: 200, read: true }
];

Using map, filter, and reduce:
1. Create an array of only the titles of books that have been read
2. Calculate the total number of pages in read books
3. Print both results
*/