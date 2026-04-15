import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './SalesReport.module.css';

const SalesReport = ({ data, onExport, onPrint }) => {
  const [dateRange, setDateRange] = useState('month');
  const [chartView, setChartView] = useState('revenue');

  if (!data) return null;

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.revenue));

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h2>Sales Analytics Report</h2>
        <div className={styles.headerActions}>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={styles.select}>
            <option value="week">This Week</option><option value="month">This Month</option><option value="quarter">This Quarter</option><option value="year">This Year</option>
          </select>
          <Button variant="primary" size="small" onClick={onPrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={onExport}>📄 Export</Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}><span>Total Revenue</span><h3>{formatCurrency(data.totalRevenue)}</h3></Card>
        <Card className={styles.kpiCard}><span>Total Orders</span><h3>{data.totalOrders}</h3></Card>
        <Card className={styles.kpiCard}><span>Avg Order Value</span><h3>{formatCurrency(data.averageOrderValue)}</h3></Card>
        <Card className={styles.kpiCard}><span>Growth</span><h3 style={{ color: '#10b981' }}>+12.5%</h3></Card>
      </div>

      <Card className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3>Revenue Trend</h3>
          <div className={styles.chartToggle}>
            <button className={`${styles.toggleBtn} ${chartView === 'revenue' ? styles.active : ''}`} onClick={() => setChartView('revenue')}>Revenue</button>
            <button className={`${styles.toggleBtn} ${chartView === 'orders' ? styles.active : ''}`} onClick={() => setChartView('orders')}>Orders</button>
          </div>
        </div>
        <div className={styles.chart}>
          {data.monthlyRevenue.map((item, idx) => (
            <div key={idx} className={styles.chartBar}>
              <div className={styles.barLabel}>{formatCurrency(item.revenue)}</div>
              <div className={styles.bar} style={{ height: `${(item.revenue / maxRevenue) * 200}px` }} />
              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.twoColumn}>
        <Card className={styles.listCard}>
          <h3>Top Customers</h3>
          {data.topCustomers.map((c, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>#{idx + 1} {c.name}</span>
              <span>{formatCurrency(c.revenue)}</span>
            </div>
          ))}
        </Card>

        <Card className={styles.listCard}>
          <h3>Top Services</h3>
          {data.productPerformance.map((p, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>{p.name}</span>
              <span>{formatCurrency(p.revenue)}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default SalesReport;
