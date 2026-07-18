/*
BUG HUNT Inheritance
*/
// Forgetting override keyword leads to hiding instead of polymorphism
// new vs override difference is subtle and catches many devs
Console.WriteLine("Always use override when you intend polymorphic behavior.");
