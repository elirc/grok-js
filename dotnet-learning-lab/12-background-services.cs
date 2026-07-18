/*
BEGINNER GOAL:
Create long-running background tasks in .NET applications.

REAL WORLD USE CASE:
Processing queues, scheduled jobs, health checks, cache refresh.

CONCEPTS COVERED:
- IHostedService
- BackgroundService base class
- Registering hosted services
*/

// ============================================
// STEP 1: Background service
// ============================================

public class QueueProcessor : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            // Do work
            await Task.Delay(1000, stoppingToken);
        }
    }
}

// ============================================
// STEP 2: Registration
// ============================================

// builder.Services.AddHostedService<QueueProcessor>();

/*
LINE-BY-LINE BREAKDOWN:

BackgroundService
- Simplifies implementing long-running services

ExecuteAsync
- Your main loop goes here
- Respect the cancellation token

NOOB TRANSLATION:

Hosted services run in the background for the lifetime of your application.

COMMON MISTAKES:

1. Not respecting the cancellation token.
2. Doing blocking work without yielding.
3. Forgetting to register the service.

TRY CHANGING THIS:

1. Add logging inside the loop.
2. Make the delay configurable.

MINI CHALLENGE:

Create a background service that writes the current time to a file every 5 seconds.
*/