import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './AccountsPayable.module.css';

const AccountsPayable = ({ payables, onRecordPayment, onAddPayable, onEditPayable, onDeletePayable }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayable, setSelectedPayable] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPayable, setEditingPayable] = useState(null);
  const [formData, setFormData] = useState({
    supplier: '', invoiceNumber: '', date: '', dueDate: '', amount: ''
  });

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

  const handleAdd = () => {
    setEditingPayable(null);
    setFormData({ supplier: '', invoiceNumber: '', date: '', dueDate: '', amount: '' });
    setShowForm(true);
  };

  const handleEdit = (payable) => {
    setEditingPayable(payable);
    setFormData({
      supplier: payable.supplier,
      invoiceNumber: payable.invoiceNumber,
      date: payable.date,
      dueDate: payable.dueDate,
      amount: payable.amount.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payable?')) {
      onDeletePayable(id);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payableData = { ...formData, amount: parseFloat(formData.amount) };
    if (editingPayable) {
      onEditPayable(editingPayable.id, payableData);
    } else {
      onAddPayable(payableData);
    }
    setShowForm(false);
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
        <div className={styles.headerActions}>
          <span className={styles.totalDue}>Total Due: <strong>{formatCurrency(totalPayable)}</strong></span>
          <Button variant="primary" size="small" onClick={handleAdd}>+ Add Payable</Button>
        </div>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingPayable ? 'Edit Payable' : 'New Payable'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} required />
              <Input label="Invoice #" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
              <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              <Input label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
              <Input label="Amount (R)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingPayable ? 'Update' : 'Add'} Payable</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

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
              <th>Supplier</th><th>Invoice #</th><th>Date</th><th>Due Date</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayables.map(p => (
              <tr key={p.id}>
                <td>{p.supplier}</td><td>{p.invoiceNumber}</td><td>{p.date}</td><td>{p.dueDate}</td><td>{formatCurrency(p.amount)}</td><td>{formatCurrency(p.paid)}</td>
                <td className={p.balance > 0 ? styles.balanceDue : ''}>{formatCurrency(p.balance)}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(p.status)}`}>{p.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    {p.balance > 0 && <Button variant="success" size="small" onClick={() => setSelectedPayable(p)}>Pay</Button>}
                    <button className={styles.actionBtn} onClick={() => handleEdit(p)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
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
