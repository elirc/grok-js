/*
Example: Selecting Elements and Handling Events Safely
*/

const button = document.querySelector("#save-btn");
const input = document.querySelector("#name-input");

if (button && input) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value.length > 0) {
      console.log("Saving:", value);
      // In real code you would call an API here
    }
  });
}

/*
querySelector returns the first matching element or null. Always guard against null before attaching listeners or reading properties. Many production bugs come from running the same script on pages that don't contain the expected elements.

The event handler receives the native Event object. Calling preventDefault() is common for form buttons or links when you want to take over the behavior entirely with JavaScript.

Notice we trim the input value. User input almost always needs cleaning before you trust it. This small step prevents many "it worked when I typed it but not when the user did" situations.

A junior should also think about removing event listeners when components unmount (in frameworks) or when the elements are removed from the DOM to avoid memory leaks.
*/
