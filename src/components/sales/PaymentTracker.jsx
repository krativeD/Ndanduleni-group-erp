import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './PaymentTracker.module.css';

const PaymentTracker = ({ payments, onRecord }) => {
  const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Card className={styles.paymentCard}>
      <div className={styles.header}>
        <h3>Payment Tracker</h3>
        <Button variant="primary" size="small" onClick={onRecord}>+ Record Payment</Button>
      </div>
      <div className={styles.summary}>
        <span>Total Received: <strong>R {totalReceived.toLocaleString()}</strong></span>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Method</th><th>Date</th><th>Reference</th></tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.invoice}</td><td>{p.customer}</td><td>R {p.amount.toLocaleString()}</td><td>{p.method}</td><td>{p.date}</td><td>{p.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PaymentTracker;
