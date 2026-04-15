import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './AccountsReceivable.module.css';

const AccountsReceivable = ({ receivables, onRecordReceipt, onAddReceivable, onEditReceivable, onDeleteReceivable }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReceivable, setSelectedReceivable] = useState(null);
  const [receiptAmount, setReceiptAmount] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingReceivable, setEditingReceivable] = useState(null);
  const [formData, setFormData] = useState({
    customer: '', invoiceNumber: '', date: '', dueDate: '', amount: ''
  });

  const filteredReceivables = receivables.filter(r => {
    const matchesSearch = r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalReceivable = filteredReceivables.reduce((sum, r) => sum + r.balance, 0);
  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'paid': styles.statusPaid, 'partial': styles.statusPartial, 'pending': styles.statusPending };
    return badges[status] || styles.statusPending;
  };

  const agingBands = {
    current: filteredReceivables.filter(r => new Date(r.dueDate) >= new Date()).reduce((sum, r) => sum + r.balance, 0),
    overdue30: filteredReceivables.filter(r => {
      const days = (new Date() - new Date(r.dueDate)) / (1000 * 60 * 60 * 24);
      return days > 0 && days <= 30;
    }).reduce((sum, r) => sum + r.balance, 0),
    overdue60: filteredReceivables.filter(r => {
      const days = (new Date() - new Date(r.dueDate)) / (1000 * 60 * 60 * 24);
      return days > 30 && days <= 60;
    }).reduce((sum, r) => sum + r.balance, 0),
    overdue90: filteredReceivables.filter(r => {
      const days = (new Date() - new Date(r.dueDate)) / (1000 * 60 * 60 * 24);
      return days > 60;
    }).reduce((sum, r) => sum + r.balance, 0)
  };

  const handleAdd = () => {
    setEditingReceivable(null);
    setFormData({ customer: '', invoiceNumber: '', date: '', dueDate: '', amount: '' });
    setShowForm(true);
  };

  const handleEdit = (receivable) => {
    setEditingReceivable(receivable);
    setFormData({
      customer: receivable.customer,
      invoiceNumber: receivable.invoiceNumber,
      date: receivable.date,
      dueDate: receivable.dueDate,
      amount: receivable.amount.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this receivable?')) {
      onDeleteReceivable(id);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const receivableData = { ...formData, amount: parseFloat(formData.amount) };
    if (editingReceivable) {
      onEditReceivable(editingReceivable.id, receivableData);
    } else {
      onAddReceivable(receivableData);
    }
    setShowForm(false);
  };

  const handleReceiptSubmit = () => {
    if (selectedReceivable && receiptAmount) {
      onRecordReceipt(selectedReceivable.id, parseFloat(receiptAmount));
      setSelectedReceivable(null);
      setReceiptAmount('');
    }
  };

  return (
    <Card className={styles.receivableCard}>
      <div className={styles.header}>
        <h3>Accounts Receivable</h3>
        <div className={styles.headerActions}>
          <span className={styles.totalDue}>Total Outstanding: <strong>{formatCurrency(totalReceivable)}</strong></span>
          <Button variant="primary" size="small" onClick={handleAdd}>+ Add Receivable</Button>
        </div>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingReceivable ? 'Edit Receivable' : 'New Receivable'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
              <Input label="Invoice #" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
              <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              <Input label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
              <Input label="Amount (R)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingReceivable ? 'Update' : 'Add'} Receivable</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.agingSummary}>
        <div className={styles.agingItem}><span>Current</span><span>{formatCurrency(agingBands.current)}</span></div>
        <div className={styles.agingItem}><span>1-30 Days</span><span>{formatCurrency(agingBands.overdue30)}</span></div>
        <div className={styles.agingItem}><span>31-60 Days</span><span>{formatCurrency(agingBands.overdue60)}</span></div>
        <div className={styles.agingItem}><span>60+ Days</span><span>{formatCurrency(agingBands.overdue90)}</span></div>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search customer/invoice..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
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
              <th>Customer</th><th>Invoice #</th><th>Date</th><th>Due Date</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceivables.map(r => (
              <tr key={r.id}>
                <td>{r.customer}</td><td>{r.invoiceNumber}</td><td>{r.date}</td><td>{r.dueDate}</td><td>{formatCurrency(r.amount)}</td><td>{formatCurrency(r.paid)}</td>
                <td className={r.balance > 0 ? styles.balanceDue : ''}>{formatCurrency(r.balance)}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    {r.balance > 0 && <Button variant="success" size="small" onClick={() => setSelectedReceivable(r)}>Receipt</Button>}
                    <button className={styles.actionBtn} onClick={() => handleEdit(r)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(r.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReceivable && (
        <div className={styles.paymentModal}>
          <h4>Record Receipt - {selectedReceivable.customer}</h4>
          <p>Balance Due: {formatCurrency(selectedReceivable.balance)}</p>
          <Input type="number" placeholder="Receipt Amount" value={receiptAmount} onChange={(e) => setReceiptAmount(e.target.value)} />
          <div className={styles.modalActions}>
            <Button variant="default" onClick={() => setSelectedReceivable(null)}>Cancel</Button>
            <Button variant="success" onClick={handleReceiptSubmit}>Record Receipt</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AccountsReceivable;
