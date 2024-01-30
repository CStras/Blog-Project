import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {      // Can add setTimeout function to simulate loading time when switching to home page.
          fetch(url) // new terminal = npx json-server --watch public/data/db.json --port 8000 / for local
          .then(res => {
            if (!res.ok) {
              throw Error('Could not fetch data for that resource!');
            }
              return res.json()
          })
          .then(data => {
              setData(data);
              setIsPending(false);
              setError(null);
          })
          .catch(err => {
            setError(err.message);
            setIsPending(false);
          })
        }, 1000);
      }, [url]);

      return { data, isPending, error}
}

export default useFetch;