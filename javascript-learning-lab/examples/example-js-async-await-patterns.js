/*
Example: Async/Await with Proper Error Handling and Parallelism
*/

async function fetchUserAndPosts(userId) {
  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`/api/users/${userId}`),
      fetch(`/api/users/${userId}/posts`)
    ]);

    if (!userRes.ok || !postsRes.ok) {
      throw new Error("Failed to load user data");
    }

    const user = await userRes.json();
    const posts = await postsRes.json();

    return { user, posts };
  } catch (error) {
    console.error("Data loading failed:", error);
    return { user: null, posts: [] };
  }
}

// Sequential would be slower:
// const user = await fetchUser();
// const posts = await fetchPosts(user.id);

console.log("Async example shows parallel fetching with Promise.all");

/*
The key insight here is the use of Promise.all to kick off two independent network requests at the same time. await only pauses the function for the promises you actually await. By creating both fetch promises first and then awaiting the array that contains them, we let them run concurrently.

Inside the try we still check the response.ok property. A fetch promise only rejects on network failure; an HTTP error status like 404 or 500 still resolves the promise with an ok flag set to false. Juniors frequently miss this and are surprised when their "successful" response has an error body.

The catch block converts any failure into a safe default return value. This is a common pattern for UI loading functions: never let a single failed request crash the whole component or page.

Compare this to writing two awaits one after another (commented). That version would wait for the user before even starting the posts request. When the two resources are independent, Promise.all is almost always the better choice.
*/
