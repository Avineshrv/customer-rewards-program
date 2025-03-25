import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import RewardsTable from '../components/rewardTable';
import TransactionTable from '../components/transactionsTable';
import Pagination from '../components/tablePagination';
import {
  HEADINGS,
  DROPDOWN_OPTIONS,
  MESSAGES,
  BUTTON_TEXT,
  TRANSACTION_PER_PAGE,
} from '../utils/constants';
import { PageContainer, FilterLabel, FilterSelect } from '../styles';
import { isInLastThreeMonths } from '../utils/helper';
import styled from 'styled-components';

const BackButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 16px auto 16px auto;
  padding: 8px 16px;
  margin-bottom: 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px var(--primary-color);
  }
`;

const CustomerRewards = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetchTransactions();
  const [selectedMonth, setSelectedMonth] = useState('last3');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);

  const customerTransactions = useMemo(() => {
    return data.filter((txn) => txn.customerId.toString() === customerId);
  }, [data, customerId]);

  const customerName =
    customerTransactions.length > 0
      ? customerTransactions[0].customerName
      : `Customer ${customerId}`;

  const monthOptions = DROPDOWN_OPTIONS.months;
  const yearOptions = DROPDOWN_OPTIONS.years;

  const filteredTransactions = useMemo(() => {
    return customerTransactions.filter((txn) => {
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
  }, [customerTransactions, selectedMonth, selectedYear]);

  const totalPages = Math.ceil(
    filteredTransactions.length / TRANSACTION_PER_PAGE
  );

  if (loading) return <p>{MESSAGES.loading}</p>;
  if (error)
    return (
      <p>
        {MESSAGES.error} {error}
      </p>
    );

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/')}>
        &#11164;&#11164; {BUTTON_TEXT.back}
      </BackButton>
      <h2>
        {customerName} {HEADINGS.customerRewards}
      </h2>
      <RewardsTable transactions={customerTransactions} />

      <h3>
        {customerName} {HEADINGS.filterByMonthYear}
      </h3>
      <div className="filters">
        <FilterLabel>
          Month:{' '}
          <FilterSelect
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
          </FilterSelect>
        </FilterLabel>

        <FilterLabel>
          Year:{' '}
          <FilterSelect
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
          </FilterSelect>
        </FilterLabel>
      </div>

      <TransactionTable
        transactions={customerTransactions}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        currentPage={currentPage}
      />

      {filteredTransactions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageContainer>
  );
};

export default CustomerRewards;
