export const fetchTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const customers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const transactions = [];
      const startDate = new Date(2024, 10, 1);
      const endDate = new Date(2025, 2, 28);

      let transactionId = 1;

      customers.forEach((customerId) => {
        for (let i = 0; i < 15; i++) {
          const randomDate = new Date(
            startDate.getTime() +
              Math.random() * (endDate.getTime() - startDate.getTime())
          );
          const formattedDate = randomDate.toISOString().split('T')[0];
          const amount = (Math.random() * 300).toFixed(2);

          transactions.push({
            customerId,
            transactionId: transactionId++,
            amount: parseFloat(amount),
            date: formattedDate,
          });
        }
      });

      resolve(transactions);
    }, 1000);
  });
};
