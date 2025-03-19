import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import { Table } from '../styles';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const { data, loading, error } = useFetchTransactions();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const uniqueCustomers = useMemo(() => {
    return [...new Set(data.map((txn) => txn.customerId))];
  }, [data]);

  const totalPages = Math.ceil(uniqueCustomers.length / customersPerPage);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * customersPerPage;
    return uniqueCustomers.slice(startIndex, startIndex + customersPerPage);
  }, [uniqueCustomers, currentPage]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="flex">
      <h2>Customers</h2>
      <Table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>View Rewards</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customerId) => (
            <tr key={customerId}>
              <td>{customerId}</td>
              <td>
                <button onClick={() => navigate(`/rewards/${customerId}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
