import React from 'react';
import Card from '../common/Card';
import styles from './ClientFeedback.module.css';

const ClientFeedback = ({ feedback }) => {
  const renderStars = (rating) => {
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card className={styles.feedbackCard}>
      <div className={styles.header}>
        <h3>Client Feedback</h3>
      </div>

      <div className={styles.feedbackList}>
        {feedback.map(item => (
          <div key={item.id} className={styles.feedbackItem}>
            <div className={styles.feedbackHeader}>
              <span className={styles.clientName}>{item.client}</span>
              {renderStars(item.rating)}
            </div>
            <p className={styles.comment}>"{item.comment}"</p>
            <span className={styles.date}>📅 {item.date}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClientFeedback;
