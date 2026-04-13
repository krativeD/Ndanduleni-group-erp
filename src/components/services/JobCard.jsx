import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './JobCard.module.css';

const JobCard = ({ job, onClose, onStatusChange }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'scheduled': styles.statusScheduled,
      'in-progress': styles.statusProgress,
      'completed': styles.statusCompleted,
      'pending': styles.statusPending
    };
    return badges[status] || styles.statusScheduled;
  };

  return (
    <Card className={styles.jobCard}>
      <div className={styles.header}>
        <div>
          <h3>{job.service}</h3>
          <span className={styles.client}>{job.client}</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Area:</span>
          <span className={styles.value}>{job.area}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Date & Time:</span>
          <span className={styles.value}>{job.date} at {job.time}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Duration:</span>
          <span className={styles.value}>{job.duration}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Team:</span>
          <span className={styles.value}>{job.team}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Priority:</span>
          <span className={styles.value} style={{ textTransform: 'capitalize' }}>{job.priority}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.statusBadge} ${getStatusBadge(job.status)}`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className={styles.checklist}>
        <h4>Task Checklist</h4>
        <label className={styles.checklistItem}>
          <input type="checkbox" /> Pre-inspection completed
        </label>
        <label className={styles.checklistItem}>
          <input type="checkbox" /> Equipment prepared
        </label>
        <label className={styles.checklistItem}>
          <input type="checkbox" /> Chemicals stocked
        </label>
        <label className={styles.checklistItem}>
          <input type="checkbox" /> Safety briefing done
        </label>
        <label className={styles.checklistItem}>
          <input type="checkbox" /> Client notified
        </label>
      </div>

      <div className={styles.actions}>
        <Button variant="default" onClick={onClose}>Cancel</Button>
        {job.status === 'scheduled' && (
          <Button variant="primary" onClick={() => onStatusChange(job.id, 'in-progress')}>
            Start Job
          </Button>
        )}
        {job.status === 'in-progress' && (
          <Button variant="success" onClick={() => onStatusChange(job.id, 'completed')}>
            Complete Job
          </Button>
        )}
      </div>
    </Card>
  );
};

export default JobCard;
