/*
BEGINNER GOAL:
Put many concepts together into one final mini project.
This file simulates a small user dashboard that displays profile info, stats, and a list of recent activity.

REAL WORLD USE CASE:
Dashboards are extremely common:
- Admin panels
- Analytics pages
- User profile overviews
- E-commerce seller dashboards
- Social media profile summaries

This project combines:
- Objects and arrays
- Functions
- DOM selection and manipulation
- Event listeners
- Async/await + fetch
- Error handling
- Rendering lists from data

CONCEPTS COVERED:
- Fetching data and handling loading states
- Rendering multiple sections from data
- Updating the UI when data changes
- Combining everything learned so far
*/

// ============================================
// FAKE DATA (used if fetch fails or for demo)
// ============================================

let dashboardData = {
  user: {
    name: "Alex Rivera",
    email: "alex@email.com",
    joinDate: "2024-03-15"
  },
  stats: {
    posts: 47,
    followers: 1280,
    following: 312
  },
  recentActivity: [
    { type: "post", text: "Published a new article", time: "2 hours ago" },
    { type: "like", text: "Liked a post by Jordan", time: "5 hours ago" },
    { type: "comment", text: "Commented on Sam's photo", time: "Yesterday" }
  ]
};

// ============================================
// RENDER USER PROFILE
// ============================================

function renderUserProfile(user) {
  let nameEl = document.querySelector("#profile-name");
  let emailEl = document.querySelector("#profile-email");
  let joinEl = document.querySelector("#profile-join");

  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = "Email: " + user.email;
  if (joinEl) joinEl.textContent = "Member since: " + user.joinDate;
}

// ============================================
// RENDER STATS
// ============================================

function renderStats(stats) {
  let postsEl = document.querySelector("#stat-posts");
  let followersEl = document.querySelector("#stat-followers");
  let followingEl = document.querySelector("#stat-following");

  if (postsEl) postsEl.textContent = stats.posts;
  if (followersEl) followersEl.textContent = stats.followers;
  if (followingEl) followingEl.textContent = stats.following;
}

// ============================================
// RENDER RECENT ACTIVITY
// ============================================

function renderActivity(activityList) {
  let container = document.querySelector("#activity-list");
  if (!container) return;

  container.innerHTML = "";

  activityList.forEach(item => {
    let div = document.createElement("div");
    div.className = "activity-item";
    div.textContent = `${item.time} — ${item.text}`;
    container.appendChild(div);
  });
}

// ============================================
// LOAD DATA FROM FAKE API (or fall back to local data)
// ============================================

async function loadDashboardData() {
  let statusEl = document.querySelector("#dashboard-status");

  if (statusEl) statusEl.textContent = "Loading dashboard...";

  try {
    // In a real app this would be a real API
    // For learning we sometimes use the fake endpoint
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    let apiUser = await response.json();

    // Build dashboard data from the API response + some fake extras
    let liveData = {
      user: {
        name: apiUser.name,
        email: apiUser.email,
        joinDate: "2024-01-01"
      },
      stats: {
        posts: 23,
        followers: 890,
        following: 145
      },
      recentActivity: [
        { type: "post", text: "Posted an update", time: "1 hour ago" },
        { type: "like", text: "Liked a comment", time: "3 hours ago" }
      ]
    };

    // Render with live data
    renderUserProfile(liveData.user);
    renderStats(liveData.stats);
    renderActivity(liveData.recentActivity);

    if (statusEl) statusEl.textContent = "Dashboard loaded from API";

  } catch (error) {
    console.log("Could not load from API, using local data:", error.message);

    // Fall back to our local dashboardData
    renderUserProfile(dashboardData.user);
    renderStats(dashboardData.stats);
    renderActivity(dashboardData.recentActivity);

    if (statusEl) statusEl.textContent = "Using demo data (API unavailable)";
  }
}

// ============================================
// SIMPLE INTERACTION: Refresh button
// ============================================

function setupRefreshButton() {
  let refreshBtn = document.querySelector("#refresh-dashboard");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadDashboardData();
    });
  }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

function initDashboard() {
  setupRefreshButton();
  loadDashboardData();
}

// Start the dashboard
initDashboard();

/*
LINE-BY-LINE BREAKDOWN:

let dashboardData = { user: {...}, stats: {...}, recentActivity: [...] }
- We have one object that holds everything the dashboard needs
- This is our "state"

renderUserProfile(user), renderStats(stats), renderActivity(...)
- We split rendering into small focused functions
- Each function is responsible for one section of the page

await fetch(...)
- We wait for the network request
- Then we wait for .json()

if (!response.ok) throw new Error(...)
- We check if the server said something went wrong
- Then we throw so it goes to catch

renderUserProfile(liveData.user)
- We pass only the piece of data each function needs
- This keeps functions simple

try { ... } catch { ... }
- If the API fails for any reason, we still show something useful
- Using local fallback data is a good user experience

NOOB TRANSLATION:

This file is a "capstone" — it uses many things you learned:
- Objects to hold structured data
- Arrays to hold lists
- Functions to organize logic
- DOM methods to update the page
- Events to let the user do things
- async/await + fetch to get real data
- try/catch so the page doesn't break when the internet is slow or the API fails

Real dashboards do exactly this kind of thing, just with more data and prettier styles.

COMMON MISTAKES (in a project like this):

1. Trying to update the DOM before the data is ready

2. Not handling the case when fetch fails

3. Putting too much code in one giant function

4. Forgetting to clear old content before rendering new content

5. Mutating data in ways that make re-rendering confusing

TRY CHANGING THIS:

1. Add a new stat (for example "likes") and display it.

2. Add a button that adds a fake activity item to the list and re-renders.

3. Make the stats numbers increase by 1 when you click them (fun interaction).

MINI CHALLENGE:

Add a new section called "Quick Actions" with two buttons:
- "Follow Someone" (increases followers by 1)
- "Write Post" (increases posts by 1 and adds an activity)

Update the data and re-render the relevant parts when clicked.
*/