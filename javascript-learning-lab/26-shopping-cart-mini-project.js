/*
BEGINNER GOAL:
Build a simple shopping cart that lets you add items, see the list, and calculate the total.
This practices arrays, objects, functions, and DOM manipulation.

REAL WORLD USE CASE:
Every e-commerce site has a shopping cart.
This mini version shows the core ideas behind adding products and showing a running total.

CONCEPTS COVERED:
- Storing cart items as objects in an array
- Adding items to the cart
- Preventing duplicate items (or allowing quantity)
- Calculating totals using loops or reduce
- Rendering the cart to the page
- Removing items from the cart
*/

// ============================================
// DATA
// ============================================

let cart = [];

// ============================================
// ADD ITEM TO CART
// ============================================

function addToCart(productName, price) {
  // Check if the item is already in the cart
  let existing = cart.find(item => item.name === productName);

  if (existing) {
    // If it exists, increase the quantity
    existing.quantity = existing.quantity + 1;
  } else {
    // Otherwise add a brand new item
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }

  renderCart();
}

// ============================================
// REMOVE ITEM FROM CART
// ============================================

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  renderCart();
}

// ============================================
// CALCULATE TOTAL
// ============================================

function calculateCartTotal() {
  let total = 0;

  for (let item of cart) {
    total = total + (item.price * item.quantity);
  }

  return total;
}

// Using reduce version (more advanced)
function calculateCartTotalWithReduce() {
  return cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

// ============================================
// RENDER THE CART
// ============================================

function renderCart() {
  let cartList = document.querySelector("#cart-list");
  let totalDisplay = document.querySelector("#cart-total");

  if (!cartList) return;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    let empty = document.createElement("li");
    empty.textContent = "Your cart is empty";
    cartList.appendChild(empty);
  } else {
    cart.forEach(item => {
      let li = document.createElement("li");

      let itemTotal = item.price * item.quantity;

      li.textContent = `${item.name} × ${item.quantity} — $${itemTotal.toFixed(2)}`;

      let removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "12px";

      removeBtn.addEventListener("click", () => {
        removeFromCart(item.name);
      });

      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
  }

  // Update total
  if (totalDisplay) {
    let total = calculateCartTotal();
    totalDisplay.textContent = "Total: $" + total.toFixed(2);
  }
}

// ============================================
// EXAMPLE: Add some products from buttons
// ============================================

function setupCartButtons() {
  // Assume HTML has buttons with data attributes:
  // <button data-name="Mouse" data-price="29.99">Add Mouse</button>

  let addButtons = document.querySelectorAll("[data-name]");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      let name = button.getAttribute("data-name");
      let price = parseFloat(button.getAttribute("data-price"));

      addToCart(name, price);
    });
  });

  // Initial render
  renderCart();
}

setupCartButtons();

/*
LINE-BY-LINE BREAKDOWN:

cart.find(item => item.name === productName)
- find returns the first item that matches the condition
- We use it to check if the product is already in the cart

existing.quantity = existing.quantity + 1
- We mutate the existing object to increase quantity
- Then we re-render

cart.push({ name, price, quantity: 1 })
- We add a brand new object representing the cart line item

cart = cart.filter(...)
- We create a new array without the removed item

item.price * item.quantity
- Each cart item knows its own price and quantity
- Multiplying them gives the line total

calculateCartTotal uses a for...of loop to sum everything

toFixed(2)
- Formats the number to always show two decimal places
- Returns a string (good for display)

NOOB TRANSLATION:

A shopping cart is just:
- An array of items
- Each item knows what it is and how many

When the user clicks "Add":
- We either increase the count of an existing item
- Or we put a new item in the array

When anything changes, we re-draw the list and recalculate the total.

This is the same basic pattern used by real stores.

COMMON MISTAKES:

1. Storing price as string instead of number (breaks math)

2. Not handling the case where the item already exists

3. Forgetting to re-render the cart after changes

4. Calculating total in multiple places instead of one function

TRY CHANGING THIS:

1. Add a "Clear Cart" button that empties the array.

2. Show the number of different items (cart.length) somewhere on the page.

3. Allow decreasing quantity with a minus button.

MINI CHALLENGE:

Add a small "Quantity" display next to each item and a "+" button that increases quantity by 1.
*/