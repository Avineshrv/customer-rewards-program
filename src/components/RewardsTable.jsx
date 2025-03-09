import React from 'react';
import { calculateRewards } from '../utils/calculations';
import { Table } from '../styles';

const RewardsTable = ({ transactions }) => {
  const rewardsData = transactions.reduce((acc, txn) => {
    const { customerId, amount, date } = txn;
    const month = new Date(date).toLocaleString('default', { month: 'long' });

    if (!acc[customerId]) acc[customerId] = {};
    if (!acc[customerId][month])
      acc[customerId][month] = { total: 0, points: 0 };

    acc[customerId][month].total += amount;
    acc[customerId][month].points += calculateRewards(amount);

    return acc;
  }, {});

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Month</th>
            <th>Total Spent</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rewardsData).map((customer) =>
            Object.keys(rewardsData[customer]).map((month) => (
              <tr key={`${customer}-${month}`}>
                <td>{customer}</td>
                <td>{month}</td>
                <td>${rewardsData[customer][month].total.toFixed(2)}</td>
                <td>{rewardsData[customer][month].points}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RewardsTable;
