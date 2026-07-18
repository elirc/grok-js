/*
Example: useEffect, Dependencies, and Cleanup
*/

import { useEffect, useState } from "react";

function UserStatus({ userId }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/users/${userId}/status`);
      if (!cancelled) {
        setStatus(await res.text());
      }
    }

    load();

    return () => { cancelled = true; }; // cleanup
  }, [userId]);

  return <div>Status: {status}</div>;
}

/*
The cleanup function returned from useEffect runs before the effect runs again and when the component unmounts. We use a cancelled flag to ignore responses that arrive after the component has moved on or the userId has changed.

The dependency array [userId] tells React to re-run the effect when userId changes. Omitting it would cause the effect to run only once (after mount) even if a different user is selected. Including every value the effect reads prevents stale closures.

Juniors should treat the dependency array as a contract: if you read a value inside the effect, it should be listed. ESLint with the react-hooks/exhaustive-deps rule helps enforce this.
*/
