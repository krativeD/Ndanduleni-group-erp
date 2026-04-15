import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './GeneralLedger.module.css';

const GeneralLedger = ({ ledger, onAddEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccount, setFilterAccount] = useState('all');

  const accounts = [...new Set(ledger.map(l => l.account))];

  const filteredLedger = ledger.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = filterAccount === 'all' || entry.account === filterAccount;
    return matchesSearch && matchesAccount;
  });

  const totalDebit = filteredLedger.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = filteredLedger.reduce((sum, e) => sum + e.credit, 0);

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  return (
    <Card className={styles.ledgerCard}>
      <div className={styles.header}>
        <h3>General Ledger</h3>
        <Button variant="primary" size="small" onClick={onAddEntry}>+ Journal Entry</Button>
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

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GeneralLedger;
