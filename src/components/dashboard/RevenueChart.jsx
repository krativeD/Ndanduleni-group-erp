import React from 'react';
import Card from '../common/Card';
import styles from './RevenueChart.module.css';

const RevenueChart = ({ data }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const recentMonths = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
  
  // Mock data
  const mockData = [24500, 31200, 28900, 35600, 42100, 38400];

  return (
    <Card className={styles.chartCard}>
      <div className={styles.header}>
        <h3>Revenue Overview</h3>
        <select className={styles.periodSelect}>
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
          <option>This Year</option>
        </select>
      </div>
      <div className={styles.chart}>
        {mockData.map((value, index) => (
          <div key={index} className={styles.barContainer}>
            <div className={styles.barWrapper}>
              <div 
                className={styles.bar} 
                style={{ height: `${(value / 50000) * 100}%` }}
              >
                <span className={styles.barValue}>${(value / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <span className={styles.barLabel}>{recentMonths[index]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RevenueChart;
