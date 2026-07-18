/*
BEGINNER GOAL:
Understand what strings are (pieces of text) and how to work with them using string methods.
Learn how to transform, combine, and inspect text.

REAL WORLD USE CASE:
Strings are everywhere in apps:
- User names and emails
- Product titles and descriptions
- Messages in chat apps
- Form input validation ("is this email valid?")
- Displaying formatted text like "Welcome back, Sarah!"

CONCEPTS COVERED:
- Creating strings (single quotes, double quotes, backticks)
- String length
- Accessing individual characters
- Common string methods: toUpperCase, toLowerCase, trim, includes, indexOf, slice, replace
- Combining strings (concatenation and template literals intro)
*/

// ============================================
// STEP 1: Creating strings
// ============================================

// A string is text wrapped in quotes.
// You can use single quotes or double quotes.
let firstName = "Maria";
let lastName = 'Rodriguez';
// Both are valid strings.

// You can also create an empty string.
let emptyMessage = "";

// ============================================
// STEP 2: Finding out how long a string is
// ============================================

// Every string has a built-in property called .length
// .length tells you how many characters are in the string.
console.log(firstName.length);
// Output: 5 (M-a-r-i-a)

// This includes spaces and punctuation!
let fullName = "Maria Rodriguez";
console.log(fullName.length);
// Output: 15 (including the space)

// ============================================
// STEP 3: Getting one character from a string
// ============================================

// Strings are like a list of letters.
// You can get a single letter using square brackets [] and the position (index).
// Important: counting starts at 0, not 1.

let greeting = "Hello";

console.log(greeting[0]);
// Output: "H"   ← first character is at position 0

console.log(greeting[1]);
// Output: "e"

console.log(greeting[4]);
// Output: "o"

console.log(greeting[5]);
// Output: undefined (there is no character at position 5)

// ============================================
// STEP 4: Changing case with methods
// ============================================

// A "method" is a function that belongs to something (in this case, a string).
// We call methods by writing dot . then the method name and ().

let city = "new york city";

// .toUpperCase() returns a NEW string with all letters in UPPERCASE.
// It does NOT change the original string.
let upperCity = city.toUpperCase();
console.log(upperCity);
// Output: "NEW YORK CITY"

console.log(city);
// Still "new york city" — original is unchanged

// .toLowerCase() does the opposite.
let lowerCity = "LOS ANGELES".toLowerCase();
console.log(lowerCity);
// Output: "los angeles"

// ============================================
// STEP 5: Removing extra spaces with trim()
// ============================================

// Users often accidentally type extra spaces when filling forms.
// .trim() removes spaces from the beginning and end.

let userInput = "   hello@example.com   ";
let cleanEmail = userInput.trim();

console.log("Original:", "[" + userInput + "]");
// Output: [   hello@example.com   ]   ← see the spaces

console.log("Cleaned:", "[" + cleanEmail + "]");
// Output: [hello@example.com]   ← spaces gone

// ============================================
// STEP 6: Checking if a string contains something
// ============================================

// .includes() checks whether a string contains another piece of text.
// It returns true or false (a boolean).

let email = "student@school.edu";

console.log(email.includes("@"));
// Output: true   ← yes, there is an @ symbol

console.log(email.includes("gmail"));
// Output: false  ← this email does not contain "gmail"

console.log(email.includes("school"));
// Output: true

// Very useful for simple validation:
let password = "mypassword123";
if (password.includes("123")) {
  console.log("Warning: password contains common numbers");
}

// ============================================
// STEP 7: Finding where something appears
// ============================================

// .indexOf() tells you the position where a piece of text starts.
// If it can't find it, it returns -1.

let sentence = "I love learning JavaScript";

console.log(sentence.indexOf("love"));
// Output: 2   ← "love" starts at position 2

console.log(sentence.indexOf("JavaScript"));
// Output: 18

console.log(sentence.indexOf("Python"));
// Output: -1  ← not found

// ============================================
// STEP 8: Cutting out part of a string with slice()
// ============================================

// .slice(start, end) returns a piece of the string.
// It does NOT change the original.

let productName = "Wireless Headphones";

let firstWord = productName.slice(0, 8);
// Starts at position 0, stops before position 8
console.log(firstWord);
// Output: "Wireless"

let lastWord = productName.slice(9);
// If you only give start, it goes to the end
console.log(lastWord);
// Output: "Headphones"

// ============================================
// STEP 9: Replacing text inside a string
// ============================================

// .replace(oldText, newText) creates a new string with text replaced.
// Note: by default it only replaces the FIRST match.

let statusMessage = "Order pending. Please wait for pending confirmation.";

let updatedStatus = statusMessage.replace("pending", "shipped");
console.log(updatedStatus);
// Output: "Order shipped. Please wait for pending confirmation."

// ============================================
// STEP 10: Combining strings
// ============================================

// Old way: using +
let displayName = firstName + " " + lastName;
console.log(displayName);
// Output: Maria Rodriguez

// Modern way (we'll learn more in template-literals file):
let modernName = `${firstName} ${lastName}`;
console.log(modernName);

/*
LINE-BY-LINE BREAKDOWN:

let firstName = "Maria";
- Creates a variable and stores the string value "Maria" inside it

console.log(firstName.length);
- .length is a property on every string
- It returns a number telling how many characters exist
- We are passing that number to console.log

console.log(greeting[0]);
- Uses bracket notation to access the character at index 0
- In JavaScript, string indexes start at zero

city.toUpperCase();
- Calls the toUpperCase method on the city string
- The parentheses () are required even when no arguments are needed
- Returns a brand new string in uppercase

let cleanEmail = userInput.trim();
- trim() removes whitespace from both ends
- The result is stored in a new variable
- userInput itself is not modified

email.includes("@");
- includes() is a method that takes one argument (the text to search for)
- It returns true if the text is found anywhere inside, otherwise false

sentence.indexOf("love");
- indexOf takes one argument: the substring to find
- Returns the starting index (number) or -1 if not found

productName.slice(0, 8);
- slice takes two arguments: start index and end index (exclusive)
- Returns a new string containing characters from start up to (but not including) end

NOOB TRANSLATION:

Think of a string like a necklace of letter beads.
- .length tells you how many beads there are
- [0] lets you look at the first bead
- toUpperCase() gives you a brand new necklace where every bead is uppercase
- includes("blue") asks "is the word blue somewhere on this necklace?"
- slice(0, 5) says "give me a new necklace made of just the first 5 beads"
- trim() says "please cut off any loose thread hanging off the ends"

COMMON MISTAKES:

1. Forgetting that strings are zero-indexed
   - greeting[1] is the SECOND letter, not the first

2. Thinking that string methods change the original string
   - They almost never do. They return a new string.

3. Forgetting the parentheses when calling methods
   - name.toUpperCase   ← wrong (no ())
   - name.toUpperCase() ← correct

4. Using .includes() but expecting it to be case-sensitive
   - "Hello".includes("hello") → false

5. Using slice with wrong numbers and getting confused about what part you get

TRY CHANGING THIS:

1. Create a variable called bio that contains your full name and a short description. Then use .length to print how long it is.

2. Take a sentence and use .toUpperCase() and .toLowerCase() on it. Print all three versions (original, upper, lower).

3. Use .includes() to check if a string contains the word "JavaScript". Then try checking for "javascript" (lowercase) and notice the difference.

MINI CHALLENGE:

You have a username that might have accidental spaces:
let messyUsername = "   CoolCoder42   ";

Do the following:
1. Trim the spaces
2. Convert it to lowercase
3. Check if it includes the word "coder"
4. Print the final clean version

Print the results at each step.
*/