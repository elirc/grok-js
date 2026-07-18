/*
BEGINNER GOAL:
Learn how to work with objects that contain other objects and arrays.
This is called "nesting" and is extremely common in real data.

REAL WORLD USE CASE:
- User profiles that contain address objects and order history arrays
- Product data that contains reviews (array of objects)
- API responses that return deeply nested data
- Settings objects with categories inside categories
- Complex forms that group related fields

CONCEPTS COVERED:
- Objects inside objects
- Arrays inside objects
- Accessing deeply nested values
- Adding and updating nested data
- Looping through nested structures (basic preview)
- Real-life data shapes you will actually see
*/

// ============================================
// STEP 1: An object containing another object
// ============================================

let user = {
  id: 101,
  name: "Jordan Lee",
  email: "jordan@email.com",
  // The address property holds another entire object
  address: {
    street: "123 Main St",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    country: "USA"
  }
};

console.log(user.name);
// Output: "Jordan Lee"

// To reach into the nested address object, we keep using dot notation
console.log(user.address.city);
// Output: "Portland"

console.log(user.address.street);
// Output: "123 Main St"

// ============================================
// STEP 2: An object containing an array
// ============================================

let product = {
  id: 55,
  name: "Mechanical Keyboard",
  price: 129,
  // The reviews property is an array of objects
  reviews: [
    { user: "Alex", rating: 5, comment: "Amazing feel!" },
    { user: "Sam", rating: 4, comment: "Great but loud." },
    { user: "Taylor", rating: 5, comment: "Best keyboard I've owned." }
  ]
};

console.log("Product:", product.name);
console.log("Number of reviews:", product.reviews.length);

// Access the first review
console.log("First review by:", product.reviews[0].user);
console.log("First review rating:", product.reviews[0].rating);

// ============================================
// STEP 3: A more complex nested structure
// ============================================

let order = {
  orderId: "ORD-9821",
  date: "2025-06-20",
  customer: {
    name: "Morgan Ellis",
    email: "morgan@email.com"
  },
  items: [
    {
      productName: "USB Cable",
      quantity: 2,
      priceEach: 8.99
    },
    {
      productName: "Wireless Mouse",
      quantity: 1,
      priceEach: 24.99
    }
  ],
  shipping: {
    method: "Express",
    address: {
      city: "Seattle",
      state: "WA"
    }
  }
};

// Let's dig into this step by step
console.log("Order ID:", order.orderId);
console.log("Customer name:", order.customer.name);
console.log("First item name:", order.items[0].productName);
console.log("Shipping city:", order.shipping.address.city);

// ============================================
// STEP 4: Adding to nested structures
// ============================================

// Add a new review to the product
product.reviews.push({
  user: "Casey",
  rating: 3,
  comment: "It's okay."
});

console.log("Total reviews now:", product.reviews.length);

// Add a new property inside the nested address
user.address.apartment = "Apt 4B";
console.log("Full address line:", user.address.street + ", " + user.address.apartment);

// ============================================
// STEP 5: Updating deeply nested values
// ============================================

// Change the shipping method
order.shipping.method = "Standard";

// Change the price of the second item
order.items[1].priceEach = 22.50;

console.log("Updated shipping method:", order.shipping.method);
console.log("Updated mouse price:", order.items[1].priceEach);

// ============================================
// STEP 6: Calculating from nested data
// ============================================

// Calculate the total cost of the order
let itemTotal = 0;

itemTotal = itemTotal + (order.items[0].quantity * order.items[0].priceEach);
itemTotal = itemTotal + (order.items[1].quantity * order.items[1].priceEach);

console.log("Order total: $" + itemTotal);

// ============================================
// STEP 7: Checking if nested properties exist
// ============================================

// Always be careful when accessing deep data
// If something in the chain is undefined, you will get an error

if (user.address && user.address.city) {
  console.log("User lives in:", user.address.city);
}

// Using optional chaining (modern but good to know)
// console.log(user.address?.city); // safe if address is missing

/*
LINE-BY-LINE BREAKDOWN:

user.address.city
- We start with user (the top-level object)
- .address reaches into the nested object
- .city reaches into the address object to get its city property
- You can chain as many dots as needed

product.reviews[0].user
- product.reviews gets the array
- [0] gets the first object in that array
- .user gets the "user" property from that object

order.items[1].priceEach
- order.items is an array of item objects
- [1] means the second item (index 1)
- .priceEach gets the price of that specific item

product.reviews.push({...})
- We are calling push on the reviews array that lives inside the product object
- The object we create with {} becomes a new element in that array

order.items[0].quantity * order.items[0].priceEach
- We reach into the first item to get two different properties
- Then we multiply them together

NOOB TRANSLATION:

Imagine a big folder:
- The main folder is called "user"
- Inside it there is another folder called "address"
- Inside the address folder are pieces of paper with "city", "street", etc.

To get the city you say:
"Open the user folder → open the address folder → read the city paper"

In code this becomes: user.address.city

Arrays inside objects are like a folder that contains many small cards.

COMMON MISTAKES:

1. Forgetting how many levels deep you are
   - user.city instead of user.address.city

2. Trying to access a property on undefined
   - If user.address doesn't exist, user.address.city will crash

3. Using the wrong index when accessing arrays inside objects

4. Accidentally replacing the entire nested object instead of updating a property inside it

TRY CHANGING THIS:

1. Add a new property inside the user's address called "phone".

2. Add another review to the product.reviews array.

3. Change the customer's email inside the order object.

MINI CHALLENGE:

Create an object called "playlist" that contains:
- A name
- An array of songs (each song is an object with title and duration in seconds)

Then:
1. Print the name of the playlist
2. Print the title of the second song
3. Calculate and print the total duration of all songs
4. Add one more song to the list
*/