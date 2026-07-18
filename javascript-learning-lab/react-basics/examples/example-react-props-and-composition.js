/*
Example: Props, Children, and Component Composition in React

How data and UI pieces flow through a component tree.
*/

function Card({ title, children, footer }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <Card 
      title={user.name}
      footer={<button onClick={() => console.log("edit", user.id)}>Edit</button>}
    >
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
    </Card>
  );
}

/*
The Card component receives three props. title is a string, children is the special prop that captures everything between the opening and closing tags, and footer is an optional React node.

By accepting children and footer as props, Card becomes a generic container. It does not need to know what kind of content will be placed inside it. This is the composition pattern.

In UserProfile we pass a user object down as a prop. The parent decides what data to give the child. The child only renders what it receives. This unidirectional data flow makes reasoning about the UI much easier.

A junior engineer should observe that we did not reach for context or global state here. Most component communication should happen through explicit props. Composition with children lets you build flexible layout primitives that can be reused across many different feature areas.
*/
