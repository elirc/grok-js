/*
JUNIOR GOAL:
Write high-quality, maintainable tests for .NET applications.

REAL WORLD USE CASE:
Protecting business logic, enabling confident refactoring, and catching regressions in CI.

CONCEPTS COVERED:
- Test pyramid (unit vs integration vs E2E)
- Test isolation and test data
- Mocking vs fakes
- Testing async code and time
- Snapshot testing and approval tests
*/

// ============================================
// STEP 1: Good unit test structure
// ============================================

[Fact]
public async Task CreateOrder_ShouldReturnOrderId_WhenValid()
{
    // Arrange
    var service = new OrderService(/* fakes */);

    // Act
    var result = await service.CreateAsync(validCommand);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().NotBeEmpty();
}

// ============================================
// STEP 2: Integration testing with WebApplicationFactory
// ============================================

var factory = new WebApplicationFactory<Program>();
var client = factory.CreateClient();

/*
DEEPER BREAKDOWN:

Focus tests on behavior, not implementation.
Use fakes for most unit tests; use real implementations (in-memory DB, TestServer) for integration.

JUNIOR PERSPECTIVE:

Good tests are fast, reliable, and readable. They should act as living documentation.

COMMON PITFALLS IN PRODUCTION:

- Brittle tests that break on every refactor.
- Slow test suites that developers stop running.
- Testing private methods or internal state.
- Shared mutable state between tests.

EXPERIMENTS:

1. Convert a test that uses concrete implementations to use a fake.
2. Write an integration test using WebApplicationFactory with an in-memory database.
3. Measure the time to run your test suite.

JUNIOR CHALLENGE:

Write a complete test suite for a small feature (e.g. order creation) that includes:
- Happy path unit test
- Validation error cases
- Integration test that hits a real (in-memory) database
- One test that verifies the correct events or messages are published
*/