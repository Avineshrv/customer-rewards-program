import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import RewardsTable from '../components/RewardsTable';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';

const CustomerRewards = () => {
  const { customerId } = useParams();
  const { data, loading, error } = useFetchTransactions();
  const [selectedMonth, setSelectedMonth] = useState('last3');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);

  const customerTransactions = useMemo(() => {
    return data.filter((txn) => txn.customerId.toString() === customerId);
  }, [data, customerId]);

  const monthOptions = useMemo(() => {
    return [
      'last3',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }, []);

  const yearOptions = useMemo(() => {
    return ['2024', '2025'];
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div>
      <h2>Customer {customerId} Rewards</h2>
      <RewardsTable transactions={customerTransactions} />

      <h3>Filter by Month and Year</h3>
      <div>
        <label>
          Month:{' '}
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {month === 'last3' ? 'Last 3 Months' : month}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Year:{' '}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TransactionTable
        transactions={customerTransactions}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
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
