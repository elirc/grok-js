/*
Example: Type Annotations vs Type Inference in TypeScript
*/

// Explicit annotation
let count: number = 42;

// Inference - TypeScript figures it out
let name = "Alex";           // string
let scores = [98, 87, 92];   // number[]

// Function with annotations
function add(a: number, b: number): number {
  return a + b;
}

// Inference on return too
const multiply = (x: number, y: number) => x * y;

/*
When you write : number you are telling the compiler and other developers exactly what is allowed. When you omit the annotation on a simple initialization, TypeScript infers the type from the value on the right.

Inference works great for local variables and simple expressions. Annotations become valuable at function boundaries (parameters and return types) because they form the public contract of the function. Callers should not have to read the function body to know what types are expected.

A junior should prefer letting inference do the work for implementation details while adding explicit types on anything that will be exported or used across files.
*/
