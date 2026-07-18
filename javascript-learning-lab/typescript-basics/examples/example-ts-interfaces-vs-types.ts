/*
Example: interface vs type in TypeScript

Both can describe object shapes, but they have different capabilities.
*/

interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

type Product = {
  id: number;
  name: string;
  price: number;
};

type ApiResponse<T> = {
  data: T;
  meta: { page: number };
};

/*
interface is designed for object shapes and supports declaration merging and extends. It is the conventional choice for modeling domain entities like User and Admin.

type is more general. It can represent unions, intersections, mapped types, and generic aliases like ApiResponse above. You cannot extend a type with the extends keyword the same way (you use intersections instead).

For a junior the practical rule is: start with interface for plain objects you might want to extend later. Reach for type when you need a union, a generic wrapper, or a computed type.

Both are erased at runtime. They exist only to give the compiler and your editor better information.
*/
