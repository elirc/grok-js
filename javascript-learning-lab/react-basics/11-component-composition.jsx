/*
BEGINNER GOAL:
Learn how to build bigger interfaces by composing smaller components together.

REAL WORLD USE CASE:
Real React apps are made of dozens or hundreds of small components working together.

CONCEPTS COVERED:
- Breaking UI into smaller pieces
- Passing props through multiple levels
- Children prop (basic)
- Thinking in components
*/

// ============================================
// STEP 1: Breaking a page into components
// ============================================

function Header() {
  return <header><h1>My App</h1></header>;
}

function Sidebar() {
  return <aside>Menu items here</aside>;
}

function Content() {
  return <main>Main content area</main>;
}

function AppLayout() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

// ============================================
// STEP 2: Passing props down
// ============================================

function Parent() {
  const user = { name: "Alex" };

  return <Child user={user} />;
}

function Child(props) {
  return <GrandChild user={props.user} />;
}

function GrandChild(props) {
  return <p>Hello {props.user.name}</p>;
}

/*
LINE-BY-LINE BREAKDOWN:

<Header /> <Sidebar /> <Content />
- We compose the page by using smaller components

<AppLayout>
- This component puts the pieces together

user={user}
- We pass data down through props

NOOB TRANSLATION:

Instead of one huge file, you create many small focused components.

Then you combine them like:
Layout = Header + Sidebar + Main

This is called composition and is one of the core ideas of React.

COMMON MISTAKES:

1. Putting too much into one component

2. Passing props too deep (prop drilling) — we'll learn better ways later (context, etc.)

3. Not giving components clear responsibilities

TRY CHANGING THIS:

1. Create a Card component and use it inside another component.

2. Build a simple page layout with at least 4 different components.

3. Pass a piece of data from a top component down two levels.

MINI CHALLENGE:

Create these components:
- ProductCard (receives name and price)
- ProductList (renders several ProductCards)
- ShopPage (contains ProductList and a title)

Compose them together.
*/