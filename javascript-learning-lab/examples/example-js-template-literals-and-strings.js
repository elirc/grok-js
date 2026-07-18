/*
Example: Template Literals vs String Concatenation

Modern string handling makes code much more readable.
*/

const user = { name: "Sam", role: "admin", loginCount: 47 };
const now = new Date().toISOString();

const oldWay = "User " + user.name + " (" + user.role + ") logged in at " + now + ". Count: " + user.loginCount;
console.log("Old:", oldWay);

const modern = `User ${user.name} (${user.role}) logged in at ${now}. Count: ${user.loginCount}`;
console.log("Modern:", modern);

const multiLine = `
  Welcome ${user.name}!
  Your role is ${user.role.toUpperCase()}.
  This is line three.
`;
console.log(multiLine);

/*
The first string is built with the + operator. While it works, it becomes difficult to read as soon as you have more than two or three pieces. Every piece needs its own quotes and plus signs, and it is very easy to miss a space or introduce a typo. Junior engineers often spend time debugging "missing space between words" bugs that come from this style.

The template literal version using backticks is evaluated as a single unit. Inside the ${} syntax you can put any valid JavaScript expression. The runtime simply inserts the stringified result. This version is dramatically easier for a human to parse at a glance because the sentence structure remains intact while the dynamic values are clearly marked.

Notice also that template literals preserve newlines and indentation. This is extremely useful when building multi-line messages, HTML snippets, or SQL queries (though for SQL you should still prefer parameterized queries). The indentation in the template above will appear in the output, which is something to be aware of when using them for formatted output.

A good habit for juniors: default to template literals for any string that contains more than one dynamic value or that spans multiple lines.
*/
