/*
Example: Generics with Constraints in C#
*/

public class Repository<T> where T : class, IEntity, new()
{
    public T Create() => new T();
    public void Save(T entity) { ... }
}

/*
The where clause restricts what T can be. class means reference type, IEntity means it must implement the interface, new() means it must have a parameterless constructor.

Constraints give you access to members of the constrained types inside the generic class while still providing compile-time safety.

Juniors should use generics to remove duplication but add constraints to keep the code safe and readable.
*/
