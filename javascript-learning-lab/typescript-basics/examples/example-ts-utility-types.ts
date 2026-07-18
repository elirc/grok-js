/*
Example: Built-in Utility Types
*/

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Partial makes all properties optional
type UserUpdate = Partial<User>;

// Pick selects only some properties
type UserSummary = Pick<User, "id" | "name">;

// Omit removes properties
type PublicUser = Omit<User, "email">;

// Required makes everything required
type StrictUser = Required<User>;

/*
These utility types are implemented with mapped types and conditional types under the hood, but you don't need to understand the implementation to use them effectively.

Partial is perfect for update payloads where the client only sends the fields it wants to change.

Pick and Omit are great for shaping data before sending it to the client or to another layer. They keep your types DRY instead of manually writing duplicate interfaces.

A junior should reach for these instead of hand-writing new interfaces that duplicate most of an existing type.
*/
