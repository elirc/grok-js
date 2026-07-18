/*
THINK-PREDICT: LINQ C#
*/
using System.Linq;
var nums = new[] {1,2,3,4};
var evens = nums.Where(n => n % 2 == 0).Select(n => n * 10);
Console.WriteLine(string.Join(",", evens));
/* Predict deferred execution: when does the query actually run? */
