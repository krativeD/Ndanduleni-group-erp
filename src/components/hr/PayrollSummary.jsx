import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './PayrollSummary.module.css';

const PayrollSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2026');

  const payrollData = [
    { id: 1, employee: 'John Mbeki', basic: 25000, allowances: 5000, deductions: 3000, net: 27000, status: 'paid' },
    { id: 2, employee: 'Sarah Ndlovu', basic: 18000, allowances: 3000, deductions: 2000, net: 19000, status: 'paid' },
    { id: 3, employee: 'Mike Khumalo', basic: 15000, allowances: 2500, deductions: 1800, net: 15700, status: 'pending' },
    { id: 4, employee: 'Emily Zulu', basic: 22000, allowances: 4000, deductions: 2800, net: 23200, status: 'paid' },
    { id: 5, employee: 'Grace Dlamini', basic: 20000, allowances: 3500, deductions: 2500, net: 21000, status: 'paid' }
  ];

  const totalPayroll = payrollData.reduce((sum, emp) => sum + emp.net, 0);
  const pendingCount = payrollData.filter(emp => emp.status === 'pending').length;

  return (
    <Card className={styles.payrollCard}>
      <div className={styles.header}>
        <h3>Payroll Summary</h3>
        <div className={styles.periodSelector}>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className={styles.select}
          >
            <option>January</option><option>February</option><option>March</option>
            <option>April</option><option>May</option><option>June</option>
            <option>July</option><option>August</option><option>September</option>
            <option>October</option><option>November</option><option>December</option>
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={styles.select}
          >
            <option>2025</option><option>2026</option><option>2027</option>
          </select>
        </div>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Payroll</span>
          <span className={styles.statValue}>R {totalPayroll.toLocaleString()}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Employees</span>
          <span className={styles.statValue}>{payrollData.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pending</span>
          <span className={styles.statValue}>{pendingCount}</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employee}</td>
                <td>R {emp.basic.toLocaleString()}</td>
                <td>R {emp.allowances.toLocaleString()}</td>
                <td>R {emp.deductions.toLocaleString()}</td>
                <td className={styles.netPay}>R {emp.net.toLocaleString()}</td>
                <td>
                  <span className={`${styles.status} ${styles[emp.status]}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <Button variant="primary">Process Payroll</Button>
        <Button variant="default">Export Report</Button>
      </div>
    </Card>
  );
};

export default PayrollSummary;
