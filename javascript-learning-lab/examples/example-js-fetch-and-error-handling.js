/*
Example: Robust Fetch Wrapper with Timeout and Typed Errors
*/

async function safeFetch(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${errorBody || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}

console.log("safeFetch demonstrates timeout, abort, and consistent error shapes");

/*
We combine AbortController with a timeout so that slow or hanging servers do not freeze the application forever. The signal is passed to fetch; when the timer fires we call abort() which makes fetch reject with an AbortError.

After the response arrives we still check res.ok. Many developers treat any fulfilled fetch as success. Real APIs return 4xx and 5xx responses that are technically "successful" HTTP deliveries but represent application errors.

By always throwing a consistent Error (with a clear message), callers get a predictable failure mode they can catch and display to users. A junior should learn to treat network code as inherently unreliable and design every call site with failure in mind.
*/
