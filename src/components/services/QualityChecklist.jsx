import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './QualityChecklist.module.css';

const QualityChecklist = ({ checks }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return styles.scoreExcellent;
    if (score >= 80) return styles.scoreGood;
    return styles.scoreFair;
  };

  return (
    <Card className={styles.qualityCard}>
      <div className={styles.header}>
        <h3>Quality Inspections</h3>
        <Button variant="primary" size="small">+ New Inspection</Button>
      </div>

      <div className={styles.checksList}>
        {checks.map(check => (
          <div key={check.id} className={styles.checkItem}>
            <div className={styles.checkHeader}>
              <div>
                <span className={styles.client}>{check.client}</span>
                <span className={styles.inspector}>Inspector: {check.inspector}</span>
              </div>
              <div className={`${styles.score} ${getScoreColor(check.score)}`}>
                {check.score}%
              </div>
            </div>

            <div className={styles.checkDetails}>
              <span className={styles.date}>📅 {check.date}</span>
              <span className={`${styles.status} ${check.status === 'passed' ? styles.passed : styles.failed}`}>
                {check.status.toUpperCase()}
              </span>
            </div>

            <div className={styles.checklistItems}>
              {check.items.map((item, idx) => (
                <span key={idx} className={styles.checkItemTag}>✓ {item}</span>
              ))}
            </div>

            {check.notes && (
              <p className={styles.notes}>📝 {check.notes}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QualityChecklist;
