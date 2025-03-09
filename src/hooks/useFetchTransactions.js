import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const useFetchTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const result = await fetchTransactions();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  return { data, loading, error };
};

export default useFetchTransactions;
