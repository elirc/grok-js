/*
BEGINNER GOAL:
Learn how functions can send information back using the return statement.
Return values let functions produce results that other code can use.

REAL WORLD USE CASE:
- A function that calculates a total and gives the number back
- A function that formats a name and returns the formatted string
- A function that checks if a user is old enough and returns true/false
- A function that gets data from somewhere and returns it
- Almost every useful function in real apps returns something

CONCEPTS COVERED:
- The return keyword
- How return sends a value back to where the function was called
- Storing the returned value in a variable
- Functions that don't return anything (implicitly return undefined)
- Using returned values in other calculations or conditions
- Multiple return statements in different branches
*/

// ============================================
// STEP 1: A function that returns a value
// ============================================

function add(a, b) {
  // The return keyword sends a value back
  return a + b;
}

// When we call add, it gives us a value we can use
let result = add(5, 3);
// The number 8 is returned and stored in result

console.log("5 + 3 =", result);
// Output: 5 + 3 = 8

// We can also use the returned value directly
console.log("10 + 7 =", add(10, 7));

// ============================================
// STEP 2: Returning vs just printing
// ============================================

// BAD: This function prints but doesn't return anything useful
function badAdd(x, y) {
  console.log(x + y);   // just prints
}

let badResult = badAdd(4, 6);
// badResult is undefined because nothing was returned

console.log("Bad result:", badResult); // undefined

// GOOD: This function returns the value
function goodAdd(x, y) {
  return x + y;
}

let goodResult = goodAdd(4, 6);
console.log("Good result:", goodResult); // 10

// ============================================
// STEP 3: Using returned values in bigger calculations
// ============================================

function calculateSubtotal(price, quantity) {
  return price * quantity;
}

function calculateTax(amount) {
  return amount * 0.08;
}

function getTotal(price, quantity) {
  let subtotal = calculateSubtotal(price, quantity);
  let tax = calculateTax(subtotal);
  let total = subtotal + tax;
  return total;
}

let orderTotal = getTotal(49.99, 2);
console.log("Your order total is: $" + orderTotal);

// ============================================
// STEP 4: Returning different values based on conditions
// ============================================

function isAdult(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

let canVote = isAdult(20);
console.log("Can vote?", canVote); // true

console.log("Can vote at 15?", isAdult(15)); // false

// ============================================
// STEP 5: Returning strings
// ============================================

function getFullName(first, last) {
  return first + " " + last;
}

let myName = getFullName("Taylor", "Kim");
console.log("Hello, " + myName);

// ============================================
// STEP 6: A function that returns an object
// ============================================

function createUser(name, email) {
  // We can return a whole new object
  return {
    name: name,
    email: email,
    createdAt: new Date()
  };
}

let newUser = createUser("Alex", "alex@test.com");
console.log(newUser);

// ============================================
// STEP 7: Early return (stopping the function)
// ============================================

function getDiscount(price, isMember) {
  if (price <= 0) {
    // Early return: stop the function right here
    return 0;
  }

  if (isMember === true) {
    return price * 0.9; // 10% off
  }

  return price; // no discount
}

console.log("Member discount on $100:", getDiscount(100, true));
console.log("Normal price on $100:", getDiscount(100, false));

/*
LINE-BY-LINE BREAKDOWN:

return a + b;
- The return keyword immediately ends the function
- Whatever comes after return is sent back to the caller
- Any code after the return statement will not run

let result = add(5, 3);
- We call the add function with arguments 5 and 3
- The function returns a value
- We store that returned value in the variable "result"

return x + y;
- The expression after return is evaluated first
- Then the result of that expression is returned

let subtotal = calculateSubtotal(price, quantity);
- The return value from calculateSubtotal is stored in subtotal
- We can now use that value in the next line

return true;
return false;
- Functions can return any type of value
- Here we are returning booleans

return {
  name: name,
  ...
};
- We can return objects, arrays, strings, numbers, booleans, etc.
- This is extremely common

if (price <= 0) {
  return 0;
}
- This is called an early return
- We stop the function immediately when we know the answer

NOOB TRANSLATION:

Imagine asking a friend to do a task:
- You say: "Go calculate 5 + 3 and tell me the answer"
- Your friend does the math and comes back saying "It's 8"
- The number 8 is the return value

A function without return is like asking someone to do something but they never report back.
You have no idea what happened or what the result was.

COMMON MISTAKES:

1. Forgetting to use the return keyword
   - The function will return undefined even if it calculates something

2. Putting code after a return statement and expecting it to run
   - Once you return, the function is done

3. Having multiple returns but forgetting that only one will execute

4. Not storing the returned value when you need it later

5. Returning inside a loop or if without realizing the whole function stops

TRY CHANGING THIS:

1. Write a function called square that takes a number and returns that number multiplied by itself.

2. Make a function called isEven that takes a number and returns true or false.

3. Modify getTotal to also return the tax amount separately (hint: return an object with total and tax).

MINI CHALLENGE:

Create a function called getGrade that takes a score (number) and returns:
- "A" if score >= 90
- "B" if score >= 80
- "C" if score >= 70
- "F" otherwise

Call it with different scores and print the results.
*/