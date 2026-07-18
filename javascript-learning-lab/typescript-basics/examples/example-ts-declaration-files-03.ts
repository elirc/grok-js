/*
TS Example - declaration-files (Variant 3)

This is one of many narrated examples added to reach a large volume of practical code samples.

CODE:
type Item = { id: number; label: string };
function filterItems<T extends Item>(items: T[], keyword: string): T[] {
  return items.filter(i => i.label.includes(keyword) || "declaration-files".includes(keyword));
}
const result = filterItems([{id:1, label: "demo"}], "example");

ENGLISH NARRATION / EXPLANATION FOR A JUNIOR SOFTWARE ENGINEER:

We are looking at a realistic usage of declaration files.

Step 1: We prepare the data or dependencies that this feature needs. In real applications this data usually comes from user input, an API response, a database query, or configuration.

Step 2: The main logic runs. Pay attention to how we avoid common pitfalls such as mutation of shared state, missing null checks, or ignoring error cases. Juniors often write the happy path first and then discover production breaks these assumptions.

Step 3: We produce a result or side effect. The code shows both the transformation and how we might communicate the outcome (return value, logging, updating UI state, or persisting).

Why this matters:
- declaration files is used in almost every non-trivial feature you will build.
- Understanding the difference between mutating and immutable approaches saves hours of debugging later.
- Proper error and edge case handling is what separates demo code from production code.
- The patterns here compose: once you understand declaration-files, you will see it inside React components, API handlers, background jobs, and data pipelines.

Try this yourself:
Change the input data, add another condition, or wrap it in a function that can be reused. Run the file and observe the output. Then read the surrounding lesson files to connect the dots.

This example exists so you can read code + explanation repeatedly until the concept feels natural. Good engineers read and write thousands of small examples like this over their career.
*/