/*
JUNIOR GOAL:
Implement a more realistic shopping cart with pricing rules, persistence, and better data modeling.

REAL WORLD USE CASE:
- E-commerce frontends
- Subscription management
- Quotation tools

CONCEPTS COVERED:
- Cart as a first-class data model
- Price calculations with discounts and taxes
- Quantity adjustments and removal
- Persisting cart state
*/

// ============================================
// STEP 1: Cart model
// ============================================

const cart = {
  items: [], // { productId, name, price, quantity }
  appliedCoupon: null
};

function getCartTotal() {
  let subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Apply coupon logic here
  return subtotal;
}

// ============================================
// STEP 2: Adding with quantity merge
// ============================================

function addToCart(product) {
  const existing = cart.items.find(i => i.productId === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
  persistCart();
}

// ============================================
// STEP 3: Better removal
// ============================================

function removeFromCart(productId) {
  cart.items = cart.items.filter(i => i.productId !== productId);
  persistCart();
}

/*
DEEPER BREAKDOWN:

Treat the cart as a domain object.
Centralize all calculations.

Merging items when adding the same product multiple times is expected behavior.

JUNIOR PERSPECTIVE:

Carts involve more business logic than most beginners expect.

COMMON PITFALLS IN PRODUCTION:

1. Storing prices in the cart that can become stale.
2. Not handling quantity limits or stock checks.
3. Losing cart state on refresh or different tabs.

EXPERIMENTS:

1. Add support for percentage and fixed amount coupons.
2. Implement optimistic stock checking.

JUNIOR CHALLENGE:

Add the following features:
- Line item total display
- Order summary with tax and shipping estimates
- Ability to change quantity with + / - buttons
- Persist across page reloads
*/