import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import { Table, PageContainer, TableWrapper } from '../styles';
import Pagination from '../components/tablePagination';
import {
  BUTTON_TEXT,
  HEADINGS,
  MESSAGES,
  TABLE_HEADERS,
  CUSTOMER_PER_PAGE,
} from '../utils/constants';
import styled from 'styled-components';

const ViewButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
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

const Dashboard = () => {
  const { data, loading, error } = useFetchTransactions();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueCustomers = useMemo(() => {
    const customerMap = {};
    data.forEach((txn) => {
      if (!customerMap[txn.customerId]) {
        customerMap[txn.customerId] = {
          customerId: txn.customerId,
          customerName: txn.customerName,
        };
      }
    });
    return Object.values(customerMap);
  }, [data]);

  const totalPages = Math.ceil(uniqueCustomers.length / CUSTOMER_PER_PAGE);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * CUSTOMER_PER_PAGE;
    return uniqueCustomers.slice(startIndex, startIndex + CUSTOMER_PER_PAGE);
  }, [uniqueCustomers, currentPage]);

  if (loading) return <p>{MESSAGES.loading}</p>;
  if (error)
    return (
      <p>
        {MESSAGES.error} {error}
      </p>
    );

  return (
    <PageContainer>
      <h2>{HEADINGS.customers}</h2>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>{TABLE_HEADERS.dashboard.customerId}</th>
              <th>{TABLE_HEADERS.dashboard.customerName}</th>
              <th>{TABLE_HEADERS.dashboard.viewRewards}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.customerName}</td>
                <td>
                  <ViewButton
                    onClick={() => navigate(`/rewards/${customer.customerId}`)}
                  >
                    {BUTTON_TEXT.view}
                  </ViewButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
};

export default Dashboard;
