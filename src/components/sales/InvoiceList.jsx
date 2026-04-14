import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './InvoiceList.module.css';

const InvoiceList = ({ invoices, onGenerate }) => {
  const getStatusBadge = (status) => {
    const badges = { 'paid': styles.statusPaid, 'partial': styles.statusPartial, 'unpaid': styles.statusUnpaid };
    return badges[status] || styles.statusUnpaid;
  };

  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + (i.total - i.paid), 0);

  return (
    <Card className={styles.invoiceCard}>
      <div className={styles.header}>
        <h3>Invoices</h3>
        <Button variant="primary" size="small" onClick={onGenerate}>+ Generate Invoice</Button>
      </div>
      <div className={styles.summary}>
        <span>Outstanding: <strong>R {totalOutstanding.toLocaleString()}</strong></span>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>Invoice #</th><th>Customer</th><th>Date</th><th>Due Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.invoiceNumber}</td><td>{inv.customer}</td><td>{inv.date}</td><td>{inv.dueDate}</td><td>R {inv.total.toLocaleString()}</td><td>R {inv.paid.toLocaleString()}</td>
                <td>R {(inv.total - inv.paid).toLocaleString()}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(inv.status)}`}>{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default InvoiceList;
