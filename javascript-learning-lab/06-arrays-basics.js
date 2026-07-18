/*
BEGINNER GOAL:
Learn what arrays are and how to create, read, and modify them.
Arrays are one of the most important ways to store lists of data.

REAL WORLD USE CASE:
Arrays are used to store collections of similar things:
- List of products in a store
- List of messages in a chat
- List of tasks in a todo app
- List of users who liked a post
- List of items in a shopping cart
- List of comments on a video

CONCEPTS COVERED:
- What an array is
- Creating arrays with square brackets []
- Accessing items using index (starting at 0)
- Adding items with push()
- Removing items with pop()
- Changing items in an array
- Finding the length of an array
- Basic looping over arrays (preview)
*/

// ============================================
// STEP 1: Creating an array
// ============================================

// An array is a list of values wrapped in square brackets [].
// The values can be strings, numbers, or anything.

let fruits = ["apple", "banana", "orange", "grape"];
// This array has 4 items (called "elements")

console.log(fruits);
// Output: ["apple", "banana", "orange", "grape"]

let prices = [2.99, 1.5, 4.25, 3.0];
let mixed = ["hello", 42, true, null]; // arrays can hold mixed types (not recommended for beginners)

// ============================================
// STEP 2: Getting items from an array using index
// ============================================

// Arrays are zero-indexed. The first item is at position 0.

console.log(fruits[0]);
// Output: "apple"   ← first item

console.log(fruits[1]);
// Output: "banana"

console.log(fruits[3]);
// Output: "grape"

console.log(fruits[4]);
// Output: undefined (there is no item at index 4)

// ============================================
// STEP 3: Knowing how many items are in the array
// ============================================

// Every array has a .length property (just like strings)

console.log(fruits.length);
// Output: 4

// We can use length - 1 to get the last item
let lastFruit = fruits[fruits.length - 1];
console.log("Last fruit:", lastFruit);
// Output: "grape"

// ============================================
// STEP 4: Changing an item inside the array
// ============================================

// You can replace any item using its index.

fruits[1] = "blueberry";
// We changed the item at index 1 from "banana" to "blueberry"

console.log(fruits);
// Output: ["apple", "blueberry", "orange", "grape"]

// ============================================
// STEP 5: Adding items to the end with push()
// ============================================

// .push() adds one or more items to the END of the array.
// It modifies the original array.

fruits.push("mango");
console.log(fruits);
// Output: ["apple", "blueberry", "orange", "grape", "mango"]

// push returns the new length of the array
let newLength = fruits.push("kiwi");
console.log("New length after push:", newLength); // 6
console.log(fruits);

// ============================================
// STEP 6: Removing the last item with pop()
// ============================================

// .pop() removes the LAST item and returns it.
// It also changes the original array.

let removedFruit = fruits.pop();
console.log("We removed:", removedFruit); // "kiwi"
console.log("Array is now:", fruits);

// ============================================
// STEP 7: A realistic shopping cart example
// ============================================

let cart = [];

cart.push("Wireless Mouse");
cart.push("USB Cable");
cart.push("Laptop Sleeve");

console.log("Current cart:", cart);
console.log("Number of items:", cart.length);

// Remove the last item (maybe user changed their mind)
let lastItem = cart.pop();
console.log("Removed from cart:", lastItem);
console.log("Cart after removal:", cart);

// ============================================
// STEP 8: Checking what is at a specific position
// ============================================

let colors = ["red", "green", "blue"];

if (colors[0] === "red") {
  console.log("The first color is red!");
}

/*
LINE-BY-LINE BREAKDOWN:

let fruits = ["apple", "banana", "orange", "grape"];
- Creates a new array using square brackets []
- The values inside are called elements
- Elements are separated by commas

fruits[0]
- Square brackets after the array name access an element by its position
- The number inside is called the "index"
- Index 0 is always the first element

fruits.length
- .length is a property that returns a number
- Tells you how many elements are currently in the array

fruits[1] = "blueberry";
- Uses the assignment operator to replace whatever was at index 1
- This directly mutates (changes) the array

fruits.push("mango");
- .push() is a method that adds a new element to the end
- It takes the new value as an argument inside the ()
- It changes the original array (it does not return a new array)

let removedFruit = fruits.pop();
- .pop() removes the last element
- It returns the removed element so you can store it if you want
- The array is now shorter by one

NOOB TRANSLATION:

Think of an array like a row of numbered boxes:
Box 0: "apple"
Box 1: "banana"
Box 2: "orange"

- fruits[0] means "look inside box number 0"
- fruits.length tells you how many boxes have things in them
- fruits.push("mango") means "put mango in a new box at the end"
- fruits.pop() means "take the last box and throw it away, but tell me what was in it"

COMMON MISTAKES:

1. Forgetting that arrays start counting at 0
   - Many beginners expect fruits[1] to be the first item

2. Trying to access an index that doesn't exist
   - You get undefined, not an error

3. Confusing .length with the last index
   - If length is 4, the last index is 3

4. Thinking push or pop create a new array
   - They change the original array

5. Using the wrong brackets (using {} or () instead of [])

TRY CHANGING THIS:

1. Add two more fruits using push(). Then print the whole array and its length.

2. Change the second item in the fruits array to something else. Print the array before and after.

3. Create an array of 5 numbers. Use console.log to print the first, middle, and last item using their indexes.

MINI CHALLENGE:

Create an array called favoriteMovies with at least 4 movie titles.
- Print how many movies are in the list
- Replace the second movie with a different one
- Add a new movie to the end using push
- Remove the last movie using pop
- Print the final list
*/