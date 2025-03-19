export const fetchTransactions = async () => {
  console.info('Starting fetchTransactions API call');
  try {
    const response = await fetch('/data/transactions.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const transactions = await response.json();
    console.info('Successfully fetched transactions', transactions);
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};
