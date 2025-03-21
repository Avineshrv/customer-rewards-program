import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import RewardsTable from '../components/rewardTable';
import TransactionTable from '../components/transactionsTable';
import Pagination from '../components/tablePagination';
import { HEADINGS, DROPDOWN_OPTIONS, MESSAGES } from '../constants';
import { PageContainer, FilterLabel, FilterSelect } from '../styles';
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
    <PageContainer>
      <BackButton onClick={() => navigate('/')}>
        &#11164;&#11164; Customer Rewards Dashboard
      </BackButton>
      <h2>
        Customer {customerId} {HEADINGS.customerRewards}
      </h2>
      <RewardsTable transactions={customerTransactions} />

      <h3>
        Customer {customerId} {HEADINGS.filterByMonthYear}
      </h3>
      <div>
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

      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
};

export default CustomerRewards;
