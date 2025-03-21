import pino from 'pino';

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
  },
  level: 'info',
});

export const fetchTransactions = async () => {
  logger.info('Starting fetchTransactions API call');
  try {
    const response = await fetch('/data/transactions.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const transactions = await response.json();
    logger.info('Successfully fetched transactions', transactions);
    return transactions;
  } catch (error) {
    logger.error('Error fetching transactions', error);
    throw error;
  }
};
