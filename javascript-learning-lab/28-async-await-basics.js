/*
BEGINNER GOAL:
Learn async and await — a much cleaner way to work with promises and fetch.

REAL WORLD USE CASE:
- Loading data when a page first opens
- Fetching user data after login
- Waiting for multiple pieces of data before showing a page
- Any time you need to wait for something before continuing

CONCEPTS COVERED:
- async keyword
- await keyword
- Writing asynchronous code that looks synchronous
- try/catch with async/await
- Cleaner code than .then() chains
*/

// ============================================
// STEP 1: Making a function async
// ============================================

// Adding "async" before a function makes it return a Promise automatically
async function sayHelloLater() {
  return "Hello in the future!";
}

// Calling an async function gives you a Promise
sayHelloLater().then(message => console.log(message));

// ============================================
// STEP 2: Using await with fetch
// ============================================

async function loadUsersAsync() {
  console.log("Starting to fetch users...");

  // await pauses the function until the fetch is done
  let response = await fetch("https://jsonplaceholder.typicode.com/users");

  // await again until json() finishes
  let users = await response.json();

  console.log("Users loaded with async/await:");
  users.forEach(user => {
    console.log(user.name);
  });
}

// loadUsersAsync();

// ============================================
// STEP 3: A realistic async function with error handling
// ============================================

async function getPost(postId) {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId);

    if (!response.ok) {
      throw new Error("Post not found");
    }

    let post = await response.json();

    console.log("Title:", post.title);
    console.log("Body:", post.body);

    return post;
  } catch (error) {
    console.log("Error loading post:", error.message);
  }
}

// ============================================
// STEP 4: Using async/await with DOM
// ============================================

async function showRandomUser() {
  let container = document.querySelector("#user-info");

  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();

    // Pick a random user
    let randomIndex = Math.floor(Math.random() * users.length);
    let user = users[randomIndex];

    if (container) {
      container.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>City: ${user.address.city}</p>
      `;
    }
  } catch (error) {
    if (container) {
      container.textContent = "Failed to load user.";
    }
  }
}

// ============================================
// STEP 5: Why async/await is nicer than .then()
// ============================================

// .then() version (messy for complex logic):
// fetch(url)
//   .then(res => res.json())
//   .then(data => { ... })
//   .catch(err => { ... });

// async/await version (clean and readable):
// let res = await fetch(url);
// let data = await res.json();

/*
LINE-BY-LINE BREAKDOWN:

async function loadUsersAsync() {
- The async keyword tells JavaScript this function will use await
- It also makes the function automatically return a Promise

let response = await fetch(...);
- await pauses execution of this function
- It waits for the Promise to resolve
- Then it puts the resolved value into the variable

let users = await response.json();
- We can use await multiple times in the same function
- Code reads top to bottom, which is much easier to understand

try { ... } catch (error) { ... }
- When using async/await, we use normal try/catch for errors
- This is usually cleaner than chaining .catch()

if (!response.ok)
- response.ok is true when the status code is 200-299
- We manually throw an error for bad responses

NOOB TRANSLATION:

async/await lets you write code that waits for things without turning into a mess of .then().

Instead of:
"Do this, then when it's done do that, then when that's done do the other thing"

You write:
"Do this and wait"
"Do that and wait"
"Do the other thing"

The code looks like normal step-by-step instructions.

COMMON MISTAKES:

1. Forgetting the async keyword before the function (await only works inside async functions)

2. Not using try/catch and being surprised when errors are silent

3. Forgetting that await only pauses the current async function, not the whole program

4. Using await on things that are not Promises

TRY CHANGING THIS:

1. Convert one of your old .then() fetch examples to async/await.

2. Use async/await to fetch posts and log only the titles.

3. Add a loading message before the await and remove it after the data arrives.

MINI CHALLENGE:

Write an async function called loadAndDisplayTodos that:
- Fetches 5 todos
- Waits for the data
- Creates <li> elements for each and puts them in a list on the page
- Uses try/catch to handle errors
*/