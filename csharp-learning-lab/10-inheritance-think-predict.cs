/*
THINK-PREDICT: C# Inheritance
*/
using System;

class Animal { public virtual void Speak() => Console.WriteLine("..."); }
class Dog : Animal { public override void Speak() => Console.WriteLine("Woof"); }

class Program {
  static void Main() {
    Animal a = new Dog();
    a.Speak(); // Predict which method
    // Also predict is vs as casting
  }
}
