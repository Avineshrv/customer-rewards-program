import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { calculateRewards } from '../utils/calculations';
import { Table, TableWrapper } from '../styles';
import { TABLE_HEADERS } from '../utils/constants';

const RewardsTable = ({ transactions }) => {
  const rewardsData = useMemo(() => {
    return transactions.reduce((acc, txn) => {
      const { customerId, amount, date } = txn;
      const month = new Date(date).toLocaleString('default', { month: 'long' });

      if (!acc[customerId]) acc[customerId] = {};
      if (!acc[customerId][month])
        acc[customerId][month] = { total: 0, points: 0 };

      acc[customerId][month].total += amount;
      acc[customerId][month].points += calculateRewards(amount);

      return acc;
    }, {});
  }, [transactions]);

  return (
    <div>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>{TABLE_HEADERS.rewards.customerId}</th>
              <th>{TABLE_HEADERS.rewards.month}</th>
              <th>{TABLE_HEADERS.rewards.totalSpent}</th>
              <th>{TABLE_HEADERS.rewards.pointsEarned}</th>
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
      </TableWrapper>
    </div>
  );
};

RewardsTable.propTypes = {
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

export default RewardsTable;
