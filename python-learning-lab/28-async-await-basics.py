"""
BEGINNER GOAL:
Learn the basics of asynchronous programming in Python using async and await.

REAL WORLD USE CASE:
Making network requests without freezing your program, handling many connections at once (web servers, chat apps, data scraping).

CONCEPTS COVERED:
- async def and await
- asyncio basics
- Running multiple coroutines
- When to use async (I/O bound) vs threads
"""

import asyncio

# ============================================
# STEP 1: Basic async function
# ============================================

async def say_hello():
    print("Hello...")
    await asyncio.sleep(1)
    print("...world!")

# ============================================
# STEP 2: Running async code
# ============================================

async def main():
    await say_hello()

asyncio.run(main())

# ============================================
# STEP 3: Running multiple tasks
# ============================================

async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"{name} done after {delay}s")

async def main2():
    await asyncio.gather(
        task("A", 2),
        task("B", 1),
        task("C", 3)
    )

asyncio.run(main2())


"""
LINE-BY-LINE BREAKDOWN:

async def say_hello():
- Defines a coroutine function

await asyncio.sleep(1)
- Pauses this coroutine for 1 second without blocking other code

asyncio.run(main())
- Runs the top-level async function

asyncio.gather(...)
- Runs multiple coroutines at the same time

NOOB TRANSLATION:

Normal functions run one after another.
Async lets you start something, go do other things while waiting, then come back when it's ready.

Great for waiting on the network or disk.

COMMON MISTAKES:

1. Forgetting to use await
2. Using time.sleep() instead of asyncio.sleep()
3. Trying to mix async and regular code incorrectly
4. Thinking async makes CPU-bound work faster (it doesn't)

TRY CHANGING THIS:

1. Make three async tasks that wait different amounts of time.
2. Use asyncio.create_task() instead of gather.
3. Add error handling inside an async function.

MINI CHALLENGE:

Write an async program that:
- Fetches (simulates with sleep) data from 5 different "servers"
- Runs them all at the same time
- Prints when each one finishes and the total time taken
"""
