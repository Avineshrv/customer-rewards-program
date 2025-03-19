import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import RewardsTable from '../components/rewardsTable';
import TransactionTable from '../components/transactionTable';
import Pagination from '../components/Pagination';
import { HEADINGS, DROPDOWN_OPTIONS, MESSAGES } from '../constants';

const CustomerRewards = () => {
  const { customerId } = useParams();
  const { data, loading, error } = useFetchTransactions();
  const [selectedMonth, setSelectedMonth] = useState('last3');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);

  const customerTransactions = useMemo(() => {
    return data.filter((txn) => txn.customerId.toString() === customerId);
  }, [data, customerId]);

  const monthOptions = DROPDOWN_OPTIONS.months;
  const yearOptions = DROPDOWN_OPTIONS.years;

  if (loading) return <p>{MESSAGES.loading}</p>;
  if (error)
    return (
      <p>
        {MESSAGES.error} {error}
      </p>
    );

  return (
    <div>
      <h2>
        Customer {customerId} {HEADINGS.customerRewards}
      </h2>
      <RewardsTable transactions={customerTransactions} />

      <h3>{HEADINGS.filterByMonthYear}</h3>
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
                {month === 'last3' ? DROPDOWN_OPTIONS.monthLabels.last3 : month}
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
