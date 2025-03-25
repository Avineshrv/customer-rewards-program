import { useState, useEffect, useCallback } from 'react';
import { fetchTransactions } from './api';

const useFetchTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchTransactions();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return { data, loading, error };
};

export default useFetchTransactions;
