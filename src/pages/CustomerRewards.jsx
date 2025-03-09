import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import RewardsTable from '../components/RewardsTable';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';

const CustomerRewards = () => {
  const { customerId } = useParams();
  const { data, loading, error } = useFetchTransactions();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  const customerTransactions = data.filter(
    (txn) => txn.customerId.toString() === customerId
  );

  const months = [
    ...new Set(
      customerTransactions.map((txn) =>
        new Date(txn.date).toLocaleString('default', { month: 'long' })
      )
    ),
  ];

  return (
    <div>
      <h2>Customer {customerId} Rewards</h2>
      <RewardsTable transactions={customerTransactions} />

      <h3>Filter by Month</h3>
      <select onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">All</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <TransactionTable
        transactions={customerTransactions}
        selectedMonth={selectedMonth}
        currentPage={currentPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CustomerRewards;
