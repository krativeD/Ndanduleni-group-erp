import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './FinancialReport.module.css';

const FinancialReport = ({ data, onExport, onPrint }) => {
  if (!data) return null;

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h2>Financial Analytics Report</h2>
        <div className={styles.headerActions}>
          <Button variant="primary" size="small" onClick={onPrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={onExport}>📄 Export</Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}><span>Total Assets</span><h3>{formatCurrency(data.totalAssets)}</h3></Card>
        <Card className={styles.kpiCard}><span>Total Liabilities</span><h3>{formatCurrency(data.totalLiabilities)}</h3></Card>
        <Card className={styles.kpiCard}><span>Total Equity</span><h3>{formatCurrency(data.totalEquity)}</h3></Card>
        <Card className={styles.kpiCard}><span>Net Income</span><h3 style={{ color: '#10b981' }}>{formatCurrency(data.netIncome)}</h3></Card>
      </div>

      <div className={styles.twoColumn}>
        <Card className={styles.pieCard}>
          <h3>Expense Breakdown</h3>
          {data.expenseBreakdown.map((e, idx) => (
            <div key={idx} className={styles.pieItem}>
              <span>{e.category}</span>
              <div className={styles.pieBar}><div style={{ width: `${e.percentage}%`, background: '#ef4444' }} /></div>
              <span>{e.percentage}%</span>
            </div>
          ))}
        </Card>

        <Card className={styles.pieCard}>
          <h3>Revenue Breakdown</h3>
          {data.revenueBreakdown.map((r, idx) => (
            <div key={idx} className={styles.pieItem}>
              <span>{r.category}</span>
              <div className={styles.pieBar}><div style={{ width: `${r.percentage}%`, background: '#10b981' }} /></div>
              <span>{r.percentage}%</span>
            </div>
          ))}
        </Card>
      </div>

      <Card className={styles.kpiTable}>
        <h3>Key Performance Indicators</h3>
        <table className={styles.table}>
          <thead><tr><th>Metric</th><th>Value</th><th>Trend</th><th>Change</th></tr></thead>
          <tbody>
            {data.kpis.map((k, idx) => (
              <tr key={idx}>
                <td>{k.name}</td><td>{k.value}</td>
                <td><span className={styles[`trend${k.trend.charAt(0).toUpperCase() + k.trend.slice(1)}`]}>{k.trend}</span></td>
                <td className={k.change.startsWith('+') ? styles.positive : styles.negative}>{k.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default FinancialReport;
