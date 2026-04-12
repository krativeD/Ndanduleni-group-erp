import React from 'react';
import Card from '../common/Card';
import styles from './RecentActivity.module.css';

const getActivityIcon = (type) => {
  const icons = {
    attendance: '📍',
    order: '📦',
    project: '📋',
    leave: '🏖️',
    payment: '💳'
  };
  return icons[type] || '📌';
};

const RecentActivity = ({ activities }) => {
  return (
    <Card className={styles.activityCard}>
      <div className={styles.header}>
        <h3>Recent Activity</h3>
        <span className={styles.viewAll}>View All →</span>
      </div>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <span className={styles.activityIcon}>{getActivityIcon(activity.type)}</span>
            <div className={styles.activityContent}>
              <span className={styles.activityUser}>{activity.user}</span>
              <span className={styles.activityAction}>{activity.action}</span>
            </div>
            <span className={styles.activityTime}>{activity.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
