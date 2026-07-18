/*
BEGINNER GOAL:
Learn the most common array methods used by beginners:
push, pop, shift, unshift, includes, indexOf, and splice.
These let you add, remove, search, and modify items in arrays.

REAL WORLD USE CASE:
- Adding and removing items from a shopping cart
- Checking if a product is already in the user's favorites
- Managing a list of notifications
- Removing a specific todo item when the user clicks delete
- Adding a new message to the top of a chat list

CONCEPTS COVERED:
- push() and pop() (add/remove from end)
- unshift() and shift() (add/remove from beginning)
- includes() (check if something exists)
- indexOf() (find the position of an item)
- splice() (remove or replace items at any position)
- How these methods affect the original array
*/

// ============================================
// STEP 1: Review of push and pop
// ============================================

let tasks = ["Buy groceries", "Walk the dog"];

tasks.push("Clean the kitchen");
// Adds to the end
console.log(tasks);
// ["Buy groceries", "Walk the dog", "Clean the kitchen"]

let finishedTask = tasks.pop();
// Removes from the end
console.log("Finished:", finishedTask);
console.log("Remaining tasks:", tasks);

// ============================================
// STEP 2: unshift and shift (the beginning of the array)
// ============================================

let playlist = ["Song A", "Song B", "Song C"];

playlist.unshift("New Hit Song");
// unshift adds to the FRONT of the array
console.log(playlist);
// ["New Hit Song", "Song A", "Song B", "Song C"]

let firstSong = playlist.shift();
// shift removes the FIRST item and returns it
console.log("Now playing:", firstSong);
console.log("Playlist:", playlist);

// ============================================
// STEP 3: Checking if an item exists with includes()
// ============================================

let cart = ["Laptop", "Mouse", "Headphones"];

let hasLaptop = cart.includes("Laptop");
// includes() checks if the value exists anywhere in the array
// It returns true or false
console.log("Has laptop in cart?", hasLaptop); // true

let hasMonitor = cart.includes("Monitor");
console.log("Has monitor?", hasMonitor); // false

// Very useful for preventing duplicates:
let itemToAdd = "Mouse";

if (cart.includes(itemToAdd)) {
  console.log(itemToAdd + " is already in your cart.");
} else {
  cart.push(itemToAdd);
  console.log("Added " + itemToAdd);
}

// ============================================
// STEP 4: Finding the position of an item with indexOf()
// ============================================

let students = ["Emma", "Liam", "Olivia", "Noah"];

let position = students.indexOf("Olivia");
// Returns the index where the item was found
console.log("Olivia is at index:", position); // 2

let notFound = students.indexOf("Mason");
console.log("Mason is at index:", notFound); // -1 (not found)

// ============================================
// STEP 5: Removing a specific item using splice()
// ============================================

let colors = ["red", "green", "blue", "yellow", "purple"];

// splice(startIndex, deleteCount)
// Removes items starting at a position

let removedColors = colors.splice(2, 2);
// Start at index 2, remove 2 items

console.log("Removed:", removedColors); // ["blue", "yellow"]
console.log("Remaining colors:", colors); // ["red", "green", "purple"]

// ============================================
// STEP 6: Using splice to insert items
// ============================================

let numbers = [1, 2, 5, 6];

// splice(2, 0, 3, 4) means:
// start at index 2
// delete 0 items
// insert 3 and 4 at that position

numbers.splice(2, 0, 3, 4);
console.log(numbers);
// [1, 2, 3, 4, 5, 6]

// ============================================
// STEP 7: Replacing items with splice
// ============================================

let fruits = ["apple", "banana", "cherry"];

fruits.splice(1, 1, "blueberry");
// Start at index 1, remove 1 item, insert "blueberry"

console.log(fruits);
// ["apple", "blueberry", "cherry"]

// ============================================
// STEP 8: A practical todo list example
// ============================================

let todoList = ["Finish homework", "Wash dishes", "Call mom"];

console.log("Today's todos:", todoList);

// Mark the second task as done (remove it)
let completed = todoList.splice(1, 1);
console.log("Completed:", completed[0]);

// Add a new urgent task at the beginning
todoList.unshift("URGENT: Submit project");

console.log("Updated todo list:", todoList);

/*
LINE-BY-LINE BREAKDOWN:

tasks.push("Clean the kitchen");
- push() is a method that takes one or more arguments
- It adds them to the end of the array
- It returns the new length of the array (we often ignore this)

let finishedTask = tasks.pop();
- pop() takes no arguments
- It removes and returns the last element
- We store what was removed so we can show the user what they finished

playlist.unshift("New Hit Song");
- unshift works like push but at the front
- All existing items get shifted one position to the right

let firstSong = playlist.shift();
- shift removes the item at index 0
- Everything else moves left to fill the gap

cart.includes("Laptop");
- includes takes one argument: the value to search for
- It does an exact match
- Returns a boolean

students.indexOf("Olivia");
- indexOf takes one argument
- Returns the first index where the value appears
- Returns -1 if the value is not in the array

colors.splice(2, 2);
- splice is powerful: first argument = starting index
- second argument = how many items to delete
- optional extra arguments = items to insert
- It changes the original array and returns an array of removed items

NOOB TRANSLATION:

Imagine your array is a line of people:
- push = person joins at the back of the line
- pop = person at the back leaves
- unshift = someone cuts to the very front
- shift = the first person in line leaves
- includes = "Is Sarah in this line?"
- indexOf = "What position is Sarah standing in?"
- splice = "Starting at person #3, remove 2 people" or "Insert new people here"

COMMON MISTAKES:

1. Expecting includes() or indexOf() to do partial matching
   - ["hello"].includes("he") → false

2. Forgetting that these methods change the original array
   - Many beginners think they create copies

3. Using splice incorrectly and removing the wrong items

4. Not storing the return value of pop/shift when you need to know what was removed

5. Trying to use push on something that is not an array

TRY CHANGING THIS:

1. Create an array of 3 favorite foods. Use unshift to add a new favorite at the beginning.

2. Use includes to check if "pizza" is in your foods array. Then add it if it's not there.

3. Use splice to remove the middle item from an array of 5 numbers.

MINI CHALLENGE:

You have this array:
let notifications = ["New follower", "New like", "New comment", "New follower"];

- Remove all "New follower" notifications using splice in a smart way
- Add a brand new notification at the front using unshift
- Use includes to check if there is still a "New comment"
- Print the final notifications array
*/