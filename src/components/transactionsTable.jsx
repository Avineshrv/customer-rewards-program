import React, { useMemo } from 'react';
import { Table, TableWrapper } from '../styles';
import PropTypes from 'prop-types';
import { MESSAGES, TABLE_HEADERS } from '../utils/constants';
import { calculateRewards } from '../utils/calculations';

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
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>{TABLE_HEADERS.transaction.transactionId}</th>
            <th>{TABLE_HEADERS.transaction.amount}</th>
            <th>{TABLE_HEADERS.transaction.date}</th>
            <th>{TABLE_HEADERS.transaction.pointsEarned}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>${txn.amount.toFixed(2)}</td>
              <td>{txn.date}</td>
              <td>{calculateRewards(txn.amount)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      transactionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default TransactionTable;
