import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './HRReport.module.css';

const HRReport = ({ data, onExport, onPrint }) => {
  if (!data) return null;

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h2>HR Analytics Report</h2>
        <div className={styles.headerActions}>
          <Button variant="primary" size="small" onClick={onPrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={onExport}>📄 Export</Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}><span>Total Employees</span><h3>{data.totalEmployees}</h3></Card>
        <Card className={styles.kpiCard}><span>Attendance Rate</span><h3>{data.attendance.rate}%</h3></Card>
        <Card className={styles.kpiCard}><span>Turnover (Annual)</span><h3>{data.turnover.annual}%</h3></Card>
        <Card className={styles.kpiCard}><span>Training Hours</span><h3>{data.training.totalHours}</h3></Card>
      </div>

      <div className={styles.twoColumn}>
        <Card className={styles.listCard}>
          <h3>Departments</h3>
          {data.departments.map((dept, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>{dept.name}</span>
              <span>{dept.count} ({dept.percentage}%)</span>
            </div>
          ))}
        </Card>

        <Card className={styles.listCard}>
          <h3>Payroll Summary</h3>
          <div className={styles.listItem}><span>Monthly Total</span><span>{formatCurrency(data.payrollSummary.monthly)}</span></div>
          <div className={styles.listItem}><span>Average Salary</span><span>{formatCurrency(data.payrollSummary.average)}</span></div>
          <div className={styles.listItem}><span>Highest</span><span>{formatCurrency(data.payrollSummary.highest)}</span></div>
          <div className={styles.listItem}><span>Lowest</span><span>{formatCurrency(data.payrollSummary.lowest)}</span></div>
        </Card>
      </div>

      <Card className={styles.trainingCard}>
        <h3>Training Overview</h3>
        <div className={styles.trainingStats}>
          <div className={styles.stat}><span>Completed</span><strong>{data.training.completed}</strong></div>
          <div className={styles.stat}><span>In Progress</span><strong>{data.training.inProgress}</strong></div>
          <div className={styles.stat}><span>Planned</span><strong>{data.training.planned}</strong></div>
        </div>
      </Card>
    </div>
  );
};

export default HRReport;
