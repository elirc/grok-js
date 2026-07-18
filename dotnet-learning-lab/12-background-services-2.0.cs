/*
JUNIOR GOAL:
Build production-grade background services that are resilient, observable, and shut down cleanly.

REAL WORLD USE CASE:
Outbox processors, queue consumers, scheduled jobs, and long-running data pipelines.

CONCEPTS COVERED:
- IHostedService lifecycle and graceful shutdown
- CancellationToken propagation
- Using Channels for backpressure
- Health checks for background work
- Error handling and retry strategies inside services
*/

// ============================================
// STEP 1: Resilient execution loop
// ============================================

protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        try
        {
            await ProcessBatchAsync(stoppingToken);
        }
        catch (OperationCanceledException) { break; }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Background work failed");
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}

// ============================================
// STEP 2: Backpressure with Channel
// ============================================

var channel = Channel.CreateBounded<WorkItem>(new BoundedChannelOptions(1000)
{
    FullMode = BoundedChannelFullMode.Wait
});

// Producer (e.g. from API) writes to channel
// Consumer (background service) reads with proper cancellation

/*
DEEPER BREAKDOWN:

Always respect the stopping token.
Bounded channels prevent unbounded memory growth.

Hosted services are the standard extensibility point for long-running work in the Generic Host.

JUNIOR PERSPECTIVE:

Background services are where many production bugs hide (leaks, duplicate processing, lost work on shutdown).

COMMON PITFALLS IN PRODUCTION:

- Not handling cancellation.
- No backpressure leading to OOM.
- Swallowing exceptions and stopping silently.
- Not integrating with health checks.

EXPERIMENTS:

1. Simulate abrupt shutdown and verify work is not lost.
2. Wire a bounded channel between an API endpoint and a background processor.
3. Add a health check that reports whether the background service is healthy.

JUNIOR CHALLENGE:

Implement a reliable outbox processor background service that:
- Reads pending events from a database
- Publishes them to a message broker
- Only marks them processed after successful publish + ack
- Supports graceful shutdown without duplicates or loss
- Exposes health and metrics
*/