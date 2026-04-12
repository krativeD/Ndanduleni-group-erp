import React from 'react';
import Card from '../common/Card';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'default' }) => {
  return (
    <Card className={`${styles.statCard} ${styles[`color-${color}`]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={styles.trend}>
          <span className={trend === 'up' ? styles.trendUp : styles.trendDown}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </span>
          <span className={styles.trendLabel}>vs last month</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
