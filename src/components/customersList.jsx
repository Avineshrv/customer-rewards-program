import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Table } from '../styles';

const CustomerList = ({ transactions }) => {
  const navigate = useNavigate();

  const uniqueCustomers = useMemo(() => {
    return [...new Set(transactions.map((txn) => txn.customerId))];
  }, [transactions]);

  return (
    <div>
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
                  View Rewards
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

CustomerList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      transactionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomerList;
