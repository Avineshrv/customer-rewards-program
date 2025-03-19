import React, { useMemo } from 'react';
import { Table } from '../styles';
import PropTypes from 'prop-types';
import { MESSAGES } from '../constants';

const TransactionTable = ({
  transactions,
  selectedMonth,
  selectedYear,
  currentPage,
}) => {
  const isInLastThreeMonths = (date) => {
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    return date >= threeMonthsAgo && date <= now;
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      let monthMatch = false;
      if (selectedMonth === 'last3') {
        monthMatch = isInLastThreeMonths(txnDate);
      } else {
        monthMatch =
          txnDate.toLocaleString('default', { month: 'long' }) ===
          selectedMonth;
      }
      const yearMatch = selectedYear
        ? txnDate.getFullYear().toString() === selectedYear
        : true;
      return monthMatch && yearMatch;
    });
  }, [transactions, selectedMonth, selectedYear]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [filteredTransactions]);

  const transactionsPerPage = 5;
  const paginatedTransactions = useMemo(() => {
    return sortedTransactions.slice(
      (currentPage - 1) * transactionsPerPage,
      currentPage * transactionsPerPage
    );
  }, [sortedTransactions, currentPage]);

  if (sortedTransactions.length === 0) {
    return <p>{MESSAGES.noTransaction}</p>;
  }

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

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      transactionId: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default TransactionTable;
