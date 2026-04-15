import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './CashManagement.module.css';

const CashManagement = ({ cashflow, onAddTransaction }) => {
  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const totalInflow = cashflow.filter(c => c.type === 'inflow').reduce((sum, c) => sum + c.amount, 0);
  const totalOutflow = cashflow.filter(c => c.type === 'outflow').reduce((sum, c) => sum + c.amount, 0);
  const netCashflow = totalInflow - totalOutflow;
  const currentBalance = cashflow.length > 0 ? cashflow[cashflow.length - 1].balance : 0;

  return (
    <Card className={styles.cashCard}>
      <div className={styles.header}>
        <h3>Cash Management</h3>
        <Button variant="primary" size="small" onClick={onAddTransaction}>+ Record Transaction</Button>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Current Balance</span>
          <span className={styles.statValue}>{formatCurrency(currentBalance)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Inflow</span>
          <span className={styles.statValue} style={{ color: '#10b981' }}>{formatCurrency(totalInflow)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Outflow</span>
          <span className={styles.statValue} style={{ color: '#ef4444' }}>{formatCurrency(totalOutflow)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Net Cashflow</span>
          <span className={styles.statValue} style={{ color: netCashflow >= 0 ? '#10b981' : '#ef4444' }}>
            {formatCurrency(netCashflow)}
          </span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {cashflow.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>
                  <span className={transaction.type === 'inflow' ? styles.inflow : styles.outflow}>
                    {transaction.type === 'inflow' ? '↓ Inflow' : '↑ Outflow'}
                  </span>
                </td>
                <td className={transaction.type === 'inflow' ? styles.amountIn : styles.amountOut}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td>{formatCurrency(transaction.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CashManagement;
