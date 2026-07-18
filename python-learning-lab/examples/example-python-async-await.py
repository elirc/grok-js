"""
Example: Async/Await with asyncio in Python
"""

import asyncio
import aiohttp

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()

async def main():
    urls = ["https://example.com/1", "https://example.com/2"]
    results = await asyncio.gather(*(fetch(u) for u in urls))
    print(len(results))

asyncio.run(main())

"""
asyncio.gather runs the awaitables concurrently. Each fetch coroutine yields control while waiting on the network.

The async with ensures the session and response are properly closed even on errors.

A junior Python engineer should reach for async when doing I/O-bound work that can benefit from concurrency without threads (web scraping, API calls, database queries with async drivers).
"""
