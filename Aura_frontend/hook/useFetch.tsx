import { useState, useEffect } from "react";
import axios from "axios";

// Accept dynamic query parameters (object)
function useFetch<T> (
  endpoint: string = "search", // default endpoint
  queryParams: Record<string, string | number> = {} // dynamic query object
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://jsearch.p.rapidapi.com/${endpoint}`, {
        params: queryParams,
        headers: {
          "x-rapidapi-key": '82b1b7f427mshe3bb229ad7c9e07p17098cjsn86c1d98af42d',
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      });

      setData(response.data.data);
    } catch (err: any) {
      setError(err);
      console.error("API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // re-run if query params or endpoint change
  }, [endpoint, JSON.stringify(queryParams)]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
