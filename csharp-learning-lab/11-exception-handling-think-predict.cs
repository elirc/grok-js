/*
THINK-PREDICT C# Exceptions
*/
try {
  int.Parse("abc");
} catch (FormatException) {
  Console.WriteLine("bad format");
} finally {
  Console.WriteLine("always");
}
/* Predict when finally runs and how catch (Exception) is too broad */
