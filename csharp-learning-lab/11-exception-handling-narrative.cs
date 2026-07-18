/*
NARRATIVE C#: Safe saving
*/
try {
  // write file for snack log
} catch (IOException ex) {
  Console.WriteLine("Could not save. " + ex.Message);
}
Console.WriteLine("Exceptions let the story handle real world failures gracefully.");
