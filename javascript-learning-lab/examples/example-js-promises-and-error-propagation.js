/*
Example: Promise Chains vs Async/Await for Error Handling
*/

function getUser(id) {
  return fetch(`/users/${id}`).then(r => {
    if (!r.ok) throw new Error("User not found");
    return r.json();
  });
}

// Old style
getUser(42)
  .then(user => getUserPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error("Failed:", err));

// Modern preferred style (see other example files)
console.log("Promise example - prefer async/await for readability");
