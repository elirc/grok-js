/*
BEGINNER GOAL:
Learn what objects are and how to store related pieces of information together using key-value pairs.
Objects are one of the most important concepts in JavaScript.

REAL WORLD USE CASE:
Objects represent real things:
- A user profile (name, email, age, avatar)
- A product (title, price, description, stock)
- A blog post (title, author, date, content)
- A shopping cart item (product, quantity, price)
- Settings and configuration data

CONCEPTS COVERED:
- Creating objects with curly braces {}
- Properties (keys) and values
- Accessing values using dot notation and bracket notation
- Adding and changing properties
- Deleting properties
- Objects inside variables
- Checking if a property exists
*/

// ============================================
// STEP 1: Creating a simple object
// ============================================

// An object is a collection of key-value pairs inside curly braces {}.
// Keys are also called "properties".

let user = {
  name: "Alex Rivera",     // key: "name", value: "Alex Rivera"
  age: 28,                 // key: "age", value: 28
  email: "alex@email.com",
  isActive: true
};

console.log(user);
// Output: { name: 'Alex Rivera', age: 28, email: 'alex@email.com', isActive: true }

// ============================================
// STEP 2: Reading values from an object
// ============================================

// Dot notation (most common)
console.log(user.name);
// Output: "Alex Rivera"

console.log(user.age);
// Output: 28

console.log(user.email);
// Output: "alex@email.com"

// Bracket notation (used when the key has spaces or is stored in a variable)
console.log(user["name"]);
// Output: "Alex Rivera"

let propertyToRead = "age";
console.log(user[propertyToRead]);
// Output: 28

// ============================================
// STEP 3: Adding new properties
// ============================================

// You can add new properties after the object is created.

user.location = "New York";
// We just added a new property called "location"

user["joinDate"] = "2024-01-15";
// You can also use bracket notation to add properties

console.log(user);

// ============================================
// STEP 4: Changing existing property values
// ============================================

user.age = 29;
// We updated the age from 28 to 29

user.isActive = false;
// Changed from true to false

console.log("Updated age:", user.age);
console.log("Is active:", user.isActive);

// ============================================
// STEP 5: A realistic product object
// ============================================

let product = {
  id: 42,
  name: "Wireless Headphones",
  price: 89.99,
  category: "Audio",
  inStock: true,
  rating: 4.7,
  tags: ["wireless", "noise-cancelling", "bluetooth"]
};

console.log("Product name:", product.name);
console.log("Price:", product.price);
console.log("Rating:", product.rating);

// ============================================
// STEP 6: Checking if a property exists
// ============================================

// Using the "in" keyword

if ("price" in product) {
  console.log("This product has a price property.");
}

if ("discount" in product) {
  console.log("There is a discount.");
} else {
  console.log("No discount property exists.");
}

// ============================================
// STEP 7: Removing a property
// ============================================

let settings = {
  theme: "dark",
  notifications: true,
  autoSave: true
};

console.log("Before delete:", settings);

// The delete operator removes a property
delete settings.autoSave;

console.log("After delete:", settings);

// ============================================
// STEP 8: Objects with different value types
// ============================================

let student = {
  name: "Taylor Kim",
  age: 20,
  grades: [85, 92, 78, 95],   // array as a property value
  address: {                  // object inside an object (nested)
    city: "Chicago",
    zip: "60601"
  },
  isEnrolled: true
};

console.log("Student name:", student.name);
console.log("First grade:", student.grades[0]);
console.log("City:", student.address.city);

/*
LINE-BY-LINE BREAKDOWN:

let user = {
  name: "Alex Rivera",
  age: 28
};
- The curly braces {} create a new object
- Inside we write key: value pairs separated by commas
- "name" is the key (also called property name)
- "Alex Rivera" is the value

user.name
- Dot notation: objectName.propertyName
- This reaches into the object and gets the value stored under "name"

user["email"]
- Bracket notation: objectName["propertyName"]
- Useful when the property name is stored in a variable or has special characters

user.age = 29;
- Uses the assignment operator to change the value of an existing property
- If the property didn't exist, this would create it

user.location = "New York";
- Adding a brand new property works the same way as changing one
- JavaScript is very flexible with objects

"price" in product
- The "in" operator checks whether a property exists on an object
- Returns true or false

delete settings.autoSave;
- The delete keyword removes a property from the object
- After this, settings.autoSave will be undefined

NOOB TRANSLATION:

Think of an object like a filing cabinet or a sticky note with labeled boxes:
- The label on each box is the key ("name", "age", "email")
- What is written inside the box is the value
- Dot notation is like saying "open the box labeled name"
- You can add new boxes, change what's inside existing boxes, or throw boxes away

COMMON MISTAKES:

1. Forgetting the colon between key and value
   - { name "Alex" } ← wrong
   - { name: "Alex" } ← correct

2. Adding a trailing comma in older JavaScript environments (mostly fine now)

3. Trying to access a property that doesn't exist
   - You get undefined, not an error

4. Confusing dot notation and bracket notation
   - user.name works
   - user."name" does NOT work

5. Accidentally overwriting the whole object instead of a property

TRY CHANGING THIS:

1. Add a new property called "hobby" to the user object and give it a value.

2. Change the product price to a different number. Print the updated product.

3. Create an object representing a car with at least 5 properties. Then print three of them using dot notation.

MINI CHALLENGE:

Create an object called "movie" with these properties:
- title
- year
- rating
- watched (boolean)

Then:
1. Print the title and year in one sentence
2. Change the rating to a different number
3. Add a new property called "genre"
4. Print the entire object
*/