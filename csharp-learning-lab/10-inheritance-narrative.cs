/*
NARRATIVE C#: Specialised snack logger
*/
class BaseLogger { public virtual void Log(string m) {} }
class FileLogger : BaseLogger { public override void Log(string m) { /* write file */ } }
// The app can now swap logging strategy as the story requires more features.
Console.WriteLine("Inheritance lets the snack tracker evolve specific behaviors.");
