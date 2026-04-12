import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ActivityTimeline.module.css';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      call: '📞',
      meeting: '🤝',
      email: '📧',
      task: '✅'
    };
    return icons[type] || '📌';
  };

  const getStatusBadge = (status) => {
    return status === 'completed' ? styles.statusCompleted : styles.statusPending;
  };

  return (
    <Card className={styles.activityCard}>
      <div className={styles.header}>
        <h3>Activity Timeline</h3>
        <Button variant="primary" size="small">+ Log Activity</Button>
      </div>

      <div className={styles.timeline}>
        {activities.map(activity => (
          <div key={activity.id} className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              {getActivityIcon(activity.type)}
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.activityHeader}>
                <span className={styles.activitySubject}>{activity.subject}</span>
                <span className={`${styles.activityStatus} ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <div className={styles.activityMeta}>
                <span>{activity.contact} • {activity.company}</span>
              </div>
              <div className={styles.activityTime}>
                <span>📅 {activity.date} at {activity.time}</span>
              </div>
              {activity.notes && (
                <p className={styles.activityNotes}>{activity.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityTimeline;
