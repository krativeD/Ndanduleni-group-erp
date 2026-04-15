import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ServiceReport.module.css';

const ServiceReport = ({ data, onExport, onPrint }) => {
  if (!data) return null;

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h2>Service Analytics Report</h2>
        <div className={styles.headerActions}>
          <Button variant="primary" size="small" onClick={onPrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={onExport}>📄 Export</Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}><span>Total Jobs</span><h3>{data.totalJobs}</h3></Card>
        <Card className={styles.kpiCard}><span>Completion Rate</span><h3>{data.completionRate}%</h3></Card>
        <Card className={styles.kpiCard}><span>In Progress</span><h3>{data.inProgress}</h3></Card>
        <Card className={styles.kpiCard}><span>Satisfaction</span><h3>{data.customerSatisfaction}/5</h3></Card>
      </div>

      <Card className={styles.listCard}>
        <h3>Top Services</h3>
        {data.topServices.map((s, idx) => (
          <div key={idx} className={styles.listItem}>
            <span>#{idx + 1} {s.name}</span>
            <span>{s.jobs} jobs</span>
            <span>{formatCurrency(s.revenue)}</span>
          </div>
        ))}
      </Card>

      <Card className={styles.teamCard}>
        <h3>Team Performance</h3>
        <table className={styles.table}>
          <thead><tr><th>Team</th><th>Jobs</th><th>Rating</th><th>Efficiency</th></tr></thead>
          <tbody>
            {data.teamPerformance.map((t, idx) => (
              <tr key={idx}>
                <td>{t.team}</td><td>{t.jobs}</td><td>{t.rating} ★</td>
                <td><div className={styles.progressBar}><div style={{ width: `${t.efficiency}%` }} /></div>{t.efficiency}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ServiceReport;
