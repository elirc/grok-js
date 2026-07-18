/*
Example: Function Parameters, Defaults, and Rest Arguments
*/

function createUser(name, role = "user", ...permissions) {
  return {
    id: Date.now(),
    name,
    role,
    permissions: permissions.length ? permissions : ["read"]
  };
}

const admin = createUser("Sam", "admin", "read", "write", "delete");
const regular = createUser("Lee");

console.log(admin);
console.log(regular);

/*
The second parameter has a default value. If the caller omits it or passes undefined, the function will use "user". Defaults make APIs easier to use and reduce the number of overloads or if-checks inside the function body.

The ...permissions syntax collects any remaining arguments into a real array. This replaces the old arguments object which was not a true array and had other gotchas. Inside the function we can treat permissions exactly like a normal array.

Notice how the return object uses shorthand property syntax (name instead of name: name). When the variable name matches the desired property name, JavaScript lets you omit the repetition.

A junior should practice reading function signatures carefully. The combination of defaults + rest + destructuring in parameters is one of the most expressive areas of modern JavaScript.
*/
