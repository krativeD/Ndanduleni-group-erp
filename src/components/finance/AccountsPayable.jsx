import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './AccountsPayable.module.css';

const AccountsPayable = ({ payables, onRecordPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayable, setSelectedPayable] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredPayables = payables.filter(p => {
    const matchesSearch = p.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPayable = filteredPayables.reduce((sum, p) => sum + p.balance, 0);
  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'paid': styles.statusPaid, 'partial': styles.statusPartial, 'pending': styles.statusPending };
    return badges[status] || styles.statusPending;
  };

  const handlePaymentSubmit = () => {
    if (selectedPayable && paymentAmount) {
      onRecordPayment(selectedPayable.id, parseFloat(paymentAmount));
      setSelectedPayable(null);
      setPaymentAmount('');
    }
  };

  return (
    <Card className={styles.payableCard}>
      <div className={styles.header}>
        <h3>Accounts Payable</h3>
        <span className={styles.totalDue}>Total Due: <strong>{formatCurrency(totalPayable)}</strong></span>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search supplier/invoice..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayables.map(p => (
              <tr key={p.id}>
                <td>{p.supplier}</td>
                <td>{p.invoiceNumber}</td>
                <td>{p.date}</td>
                <td>{p.dueDate}</td>
                <td>{formatCurrency(p.amount)}</td>
                <td>{formatCurrency(p.paid)}</td>
                <td className={p.balance > 0 ? styles.balanceDue : ''}>{formatCurrency(p.balance)}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(p.status)}`}>{p.status}</span></td>
                <td>
                  {p.balance > 0 && (
                    <Button variant="primary" size="small" onClick={() => setSelectedPayable(p)}>Record Payment</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPayable && (
        <div className={styles.paymentModal}>
          <h4>Record Payment - {selectedPayable.supplier}</h4>
          <p>Balance Due: {formatCurrency(selectedPayable.balance)}</p>
          <Input type="number" placeholder="Payment Amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
          <div className={styles.modalActions}>
            <Button variant="default" onClick={() => setSelectedPayable(null)}>Cancel</Button>
            <Button variant="success" onClick={handlePaymentSubmit}>Record Payment</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AccountsPayable;
