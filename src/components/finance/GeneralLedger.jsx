import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './GeneralLedger.module.css';

const GeneralLedger = ({ ledger, onAddEntry, onEditEntry, onDeleteEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccount, setFilterAccount] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    account: '',
    description: '',
    debit: '',
    credit: ''
  });

  const accounts = [...new Set(ledger.map(l => l.account))];

  const filteredLedger = ledger.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = filterAccount === 'all' || entry.account === filterAccount;
    return matchesSearch && matchesAccount;
  });

  const totalDebit = filteredLedger.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = filteredLedger.reduce((sum, e) => sum + e.credit, 0);

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const handleAdd = () => {
    setEditingEntry(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      account: '',
      description: '',
      debit: '',
      credit: ''
    });
    setShowForm(true);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      account: entry.account,
      description: entry.description,
      debit: entry.debit.toString(),
      credit: entry.credit.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDeleteEntry(id);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entryData = {
      ...formData,
      debit: parseFloat(formData.debit) || 0,
      credit: parseFloat(formData.credit) || 0
    };
    
    if (editingEntry) {
      onEditEntry(editingEntry.id, entryData);
    } else {
      onAddEntry(entryData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.ledgerCard}>
      <div className={styles.header}>
        <h3>General Ledger</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Journal Entry</Button>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Debits</span>
          <span className={styles.statValue}>{formatCurrency(totalDebit)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Credits</span>
          <span className={styles.statValue}>{formatCurrency(totalCredit)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Balance</span>
          <span className={styles.statValue} style={{ color: totalDebit === totalCredit ? '#10b981' : '#ef4444' }}>
            {formatCurrency(totalDebit - totalCredit)}
          </span>
        </div>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              <select name="account" value={formData.account} onChange={handleChange} className={styles.select} required>
                <option value="">Select Account</option>
                {accounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
              </select>
              <Input label="Description" name="description" value={formData.description} onChange={handleChange} required />
              <Input label="Debit (R)" name="debit" type="number" step="0.01" value={formData.debit} onChange={handleChange} />
              <Input label="Credit (R)" name="credit" type="number" step="0.01" value={formData.credit} onChange={handleChange} />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingEntry ? 'Update' : 'Add'} Entry</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search entries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)}>
          <option value="all">All Accounts</option>
          {accounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Account</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLedger.map(entry => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.account}</td>
                <td>{entry.description}</td>
                <td className={styles.debit}>{entry.debit > 0 ? formatCurrency(entry.debit) : '—'}</td>
                <td className={styles.credit}>{entry.credit > 0 ? formatCurrency(entry.credit) : '—'}</td>
                <td>{formatCurrency(entry.balance)}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => handleEdit(entry)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(entry.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GeneralLedger;
