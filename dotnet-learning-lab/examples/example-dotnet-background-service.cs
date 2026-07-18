/*
Example: IHostedService / BackgroundService for Recurring Work
*/

public class CleanupService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await DoCleanup();
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}

"""
Inherit from BackgroundService and implement ExecuteAsync. Respect the stopping token so the application can shut down cleanly.

Register with AddHostedService<CleanupService>() in Program.cs.

Use for periodic jobs, queue processing, or any work that should run for the lifetime of the app outside of HTTP requests.

A junior should understand the difference between request-scoped work and application lifetime work.
"""
