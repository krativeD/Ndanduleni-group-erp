import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './FinancialReports.module.css';

const FinancialReports = ({ reports }) => {
  const [activeReport, setActiveReport] = useState('income');

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  if (!reports) return null;

  const handlePrint = () => window.print();
  const handleDownloadPDF = () => window.print();

  return (
    <Card className={styles.reportsCard}>
      <div className={styles.header}>
        <h3>Financial Reports</h3>
        <div className={styles.headerActions}>
          <Button variant="primary" size="small" onClick={handlePrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={handleDownloadPDF}>📄 PDF</Button>
        </div>
      </div>

      <div className={styles.reportTabs}>
        <button className={`${styles.tab} ${activeReport === 'income' ? styles.active : ''}`} onClick={() => setActiveReport('income')}>
          Income Statement
        </button>
        <button className={`${styles.tab} ${activeReport === 'balance' ? styles.active : ''}`} onClick={() => setActiveReport('balance')}>
          Balance Sheet
        </button>
      </div>

      {activeReport === 'income' && (
        <div className={styles.reportContent}>
          <h4>Income Statement - April 2026</h4>
          <div className={styles.reportSection}>
            <h5>Revenue</h5>
            {Object.entries(reports.incomeStatement.revenue).map(([key, value]) => (
              <div key={key} className={styles.reportRow}>
                <span>{key}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
          </div>
          <div className={styles.reportSection}>
            <h5>Expenses</h5>
            {Object.entries(reports.incomeStatement.expenses).map(([key, value]) => (
              <div key={key} className={styles.reportRow}>
                <span>{key}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.reportRow} ${styles.total}`}>
            <span>Net Income</span>
            <span style={{ color: reports.incomeStatement.netIncome >= 0 ? '#10b981' : '#ef4444' }}>
              {formatCurrency(reports.incomeStatement.netIncome)}
            </span>
          </div>
        </div>
      )}

      {activeReport === 'balance' && (
        <div className={styles.reportContent}>
          <h4>Balance Sheet - As at April 2026</h4>
          <div className={styles.reportSection}>
            <h5>Assets</h5>
            {Object.entries(reports.balanceSheet.assets).map(([key, value]) => (
              <div key={key} className={styles.reportRow}>
                <span>{key}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
          </div>
          <div className={styles.reportSection}>
            <h5>Liabilities</h5>
            {Object.entries(reports.balanceSheet.liabilities).map(([key, value]) => (
              <div key={key} className={styles.reportRow}>
                <span>{key}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
          </div>
          <div className={styles.reportSection}>
            <h5>Equity</h5>
            {Object.entries(reports.balanceSheet.equity).map(([key, value]) => (
              <div key={key} className={styles.reportRow}>
                <span>{key}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.reportRow} ${styles.total}`}>
            <span>Total Liabilities + Equity</span>
            <span>{formatCurrency(reports.balanceSheet.liabilities['Total Liabilities'] + reports.balanceSheet.equity['Total Equity'])}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FinancialReports;
