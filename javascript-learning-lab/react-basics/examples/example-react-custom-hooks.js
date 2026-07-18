/*
Example: Extracting Logic into Custom Hooks
*/

import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetch(url)
      .then(r => r.json())
      .then(d => { if (!ignore) setData(d); })
      .catch(e => { if (!ignore) setError(e); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [url]);

  return { data, loading, error };
}

function UserList() {
  const { data, loading } = useFetch("/api/users");
  if (loading) return <p>Loading...</p>;
  return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

/*
A custom hook is just a function whose name starts with "use". It can call other hooks. By moving the fetch logic into useFetch, any component can reuse the exact same loading, error, and cancellation behavior without duplication.

The hook encapsulates the "how" while the component only declares the "what" (give me users). This separation keeps components focused on UI and makes the data loading logic easy to test in isolation.

Juniors should look for repeated useEffect + useState patterns and consider extracting them into custom hooks.
*/
