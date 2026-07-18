/*
BEGINNER GOAL:
Learn the basics of fetch — how to ask a server for data from JavaScript.
This is how almost every modern web app gets data.

REAL WORLD USE CASE:
- Loading a list of products from a server
- Getting the current weather
- Fetching user profile data
- Loading comments on a post
- Any time your page needs fresh data from the internet

CONCEPTS COVERED:
- What fetch does
- Promises (basic understanding)
- .then() to handle responses
- Handling JSON data
- Error handling basics with .catch()
- Fake API endpoints you can use for practice
*/

// NOTE:
// fetch returns a Promise. Promises represent work that will finish in the future.
// For now we will use .then() and .catch().
// We will learn the cleaner async/await version in the next file.

// ============================================
// STEP 1: Basic fetch to a public API
// ============================================

// JSONPlaceholder is a free fake API perfect for learning
// https://jsonplaceholder.typicode.com/

function loadUsers() {
  console.log("Fetching users...");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      // The first .then gives us the response object
      // We need to call .json() to actually read the data
      return response.json();
    })
    .then(function(users) {
      // Now we have the actual data (array of users)
      console.log("Users received:", users);

      // Example: print each user's name
      users.forEach(function(user) {
        console.log(user.name);
      });
    })
    .catch(function(error) {
      console.log("Something went wrong:", error);
    });
}

// Call the function to start fetching
// loadUsers();

// ============================================
// STEP 2: Fetching a single post
// ============================================

function loadPost(postId) {
  fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
    .then(response => response.json())
    .then(post => {
      console.log("Post title:", post.title);
      console.log("Post body:", post.body);
    })
    .catch(error => {
      console.log("Failed to load post:", error);
    });
}

// ============================================
// STEP 3: Fetching and displaying in the DOM
// ============================================

function displayTodos() {
  let container = document.querySelector("#api-data");

  fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(response => response.json())
    .then(todos => {
      if (!container) return;

      container.innerHTML = "";

      todos.forEach(todo => {
        let div = document.createElement("div");
        div.textContent = `${todo.id}. ${todo.title} — ${todo.completed ? "Done" : "Not done"}`;
        container.appendChild(div);
      });
    })
    .catch(() => {
      if (container) {
        container.textContent = "Failed to load todos.";
      }
    });
}

// ============================================
// STEP 4: What fetch actually returns
// ============================================

// fetch(url) returns a Promise
// A Promise is like a box that will eventually have a result
// .then() lets you say "when the box has the result, do this"
// .catch() lets you handle when something goes wrong

/*
LINE-BY-LINE BREAKDOWN:

fetch("https://jsonplaceholder.typicode.com/users")
- We give fetch a URL
- It starts a network request in the background
- It immediately returns a Promise (not the data yet)

.then(function(response) { return response.json(); })
- When the response comes back, this function runs
- response is an object describing what the server sent
- response.json() returns another Promise that resolves to the actual data

.then(function(users) { ... })
- This runs after .json() finishes
- "users" is the real JavaScript array/object we can use

.catch(function(error) { ... })
- If anything goes wrong (network error, bad URL, etc), this runs
- Very important to always have error handling

NOOB TRANSLATION:

Imagine you order food:
- You place the order (call fetch)
- The restaurant starts cooking (network request)
- They don't hand you the food immediately
- When it's ready, someone delivers it (.then)
- If something goes wrong, you get told (.catch)

COMMON MISTAKES:

1. Forgetting that fetch is asynchronous — code after fetch runs immediately

2. Forgetting to call .json() on the response

3. Not handling errors with .catch()

4. Trying to use the data outside of the .then chain

TRY CHANGING THIS:

1. Change the URL to fetch posts instead of users.

2. Use fetch to get a single todo and log its title.

3. Try fetching from a bad URL and see the error in .catch().

MINI CHALLENGE:

Fetch the list of users and display only their names and emails in a <ul> on the page.
Use querySelector to find a container element.
*/