/*
Advanced Collections Examples in C# (EXPANDED 3-5x)

Example 1: List<T> operations deep
using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> {1,2,3};
numbers.AddRange(new[] {4,5,6});
numbers.RemoveAll(x => x % 2 == 0);
numbers.Sort((a, b) => b - a);
Console.WriteLine(string.Join(", ", numbers));

Example 2: Dictionary best practices
var ages = new Dictionary<string, int> { {"Alice", 30}, {"Bob", 25} };
ages["Charlie"] = 35;
if (ages.TryGetValue("Alice", out int age)) Console.WriteLine(age);
// Avoid ages["missing"] - KeyNotFound
Console.WriteLine(ages.GetValueOrDefault("missing", -1));

Example 3: HashSet for uniqueness + set math
var unique = new HashSet<int> {1,2,2,3};
unique.Add(1); // ignored
var other = new HashSet<int>{3,4,5};
unique.IntersectWith(other); // keeps only common

Example 4: Queue and Stack for algorithms
var queue = new Queue<string>();
queue.Enqueue("first"); queue.Enqueue("second");
Console.WriteLine(queue.Dequeue()); // FIFO

var stack = new Stack<int>();
stack.Push(1); stack.Push(2);
Console.WriteLine(stack.Pop()); // LIFO

Example 5: LinkedList<T> efficient splice
var ll = new LinkedList<int>();
var node = ll.AddLast(10);
ll.AddBefore(node, 5);

Example 6: ReadOnlyCollection / Immutable
var ro = numbers.AsReadOnly();
var imm = System.Collections.Immutable.ImmutableList.CreateRange(numbers);

Example 7: SortedDictionary / SortedSet
var sorted = new SortedDictionary<string, int>();
sorted["b"] = 2; sorted["a"] = 1; // auto ordered

Example 8: Concurrent collections intro mention
// ConcurrentDictionary, BlockingCollection for threads

EXPANDED PROBLEMS (8+):
1. Build frequency counter with Dictionary<string,int>.
2. Remove duplicate items preserving first-seen order (List + HashSet).
3. LRU cache sketch: Dictionary + LinkedList.
4. Implement PriorityQueue simulation (pre-builtin).
5. Custom collection enforcing unique + sorted on add.
6. Use Queue to implement level-order tree traversal stub.
7. Difference between List.Remove and RemoveAll.
8. Demonstrate capacity and TrimExcess.
*/
