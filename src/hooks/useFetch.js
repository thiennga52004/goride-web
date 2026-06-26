import { useState, useEffect, useCallback } from 'react';

export const useFetch = (fetchFn, params = null, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (overrideParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(overrideParams ?? params);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFn, params]);

  useEffect(() => {
    let active = true;
    if (immediate) {
      setTimeout(() => {
        if (active) {
          execute();
        }
      }, 0);
    }
    return () => {
      active = false;
    };
  }, [execute, immediate]);

  const refetch = useCallback(() => execute(), [execute]);

  return { data, loading, error, refetch, execute };
};
