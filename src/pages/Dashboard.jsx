import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchTransactions from '../hooks/useFetchTransactions';
import { Table } from '../styles';

const Dashboard = () => {
  const { data, loading, error } = useFetchTransactions();
  const navigate = useNavigate();

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  const uniqueCustomers = [...new Set(data.map((txn) => txn.customerId))];

  return (
    <div className='flex'>
      <h2>Customers</h2>
      <Table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>View Rewards</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCustomers.map((customerId) => (
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
    </div>
  );
};

export default Dashboard;
