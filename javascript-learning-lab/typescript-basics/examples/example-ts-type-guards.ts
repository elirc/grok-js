/*
Example: Type Guards and Discriminated Unions
*/

type Success = { kind: "success"; data: string };
type Failure = { kind: "failure"; error: string };
type Result = Success | Failure;

function isSuccess(r: Result): r is Success {
  return r.kind === "success";
}

function handle(r: Result) {
  if (isSuccess(r)) {
    console.log(r.data.toUpperCase()); // narrowed to Success
  }
}

/*
Type guards are functions that return a type predicate (param is Type). Inside the if, TypeScript narrows the type.

Discriminated unions use a common literal field ("kind" here) to let the compiler know which member of the union you are dealing with after a check.

These patterns are the foundation of robust error handling and state machines in TypeScript.
*/
