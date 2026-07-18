/*
Example: Delegates, Events, and Action/Func in C#
*/

public event EventHandler<TaskCompletedEventArgs> TaskCompleted;

public void DoWork()
{
    // ...
    TaskCompleted?.Invoke(this, new TaskCompletedEventArgs(taskId));
}

// Subscriber
service.TaskCompleted += (sender, e) => Console.WriteLine($"Done: {e.TaskId}");

/*
Events are a special kind of delegate that can only be invoked from within the declaring class. They implement the publisher/subscriber pattern cleanly.

Action and Func are built-in generic delegates that remove the need to declare your own delegate types in most cases.

A junior C# engineer should understand when to use events versus simple callbacks passed as parameters.
*/
