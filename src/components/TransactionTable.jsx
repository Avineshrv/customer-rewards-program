import React, { useMemo } from 'react';
import { Table } from '../styles';

const TransactionTable = ({ transactions, selectedMonth, currentPage }) => {
  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (txn) =>
        !selectedMonth ||
        new Date(txn.date).toLocaleString('default', { month: 'long' }) ===
          selectedMonth
    );
  }, [transactions, selectedMonth]);

  const paginatedTransactions = useMemo(() => {
    const transactionsPerPage = 5;
    return filteredTransactions.slice(
      (currentPage - 1) * transactionsPerPage,
      currentPage * transactionsPerPage
    );
  }, [filteredTransactions, currentPage]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {paginatedTransactions.map((txn) => (
          <tr key={txn.transactionId}>
            <td>{txn.transactionId}</td>
            <td>${txn.amount.toFixed(2)}</td>
            <td>{txn.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
