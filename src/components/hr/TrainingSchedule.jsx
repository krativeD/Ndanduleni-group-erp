import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './TrainingSchedule.module.css';

const TrainingSchedule = () => {
  const trainings = [
    { id: 1, title: 'Health & Safety', trainer: 'External Consultant', date: '2026-04-15', time: '09:00', attendees: 12, status: 'upcoming' },
    { id: 2, title: 'Customer Service Excellence', trainer: 'HR Department', date: '2026-04-18', time: '10:00', attendees: 8, status: 'upcoming' },
    { id: 3, title: 'Equipment Maintenance', trainer: 'Mike Khumalo', date: '2026-04-22', time: '14:00', attendees: 5, status: 'upcoming' },
    { id: 4, title: 'Leadership Skills', trainer: 'External Consultant', date: '2026-04-10', time: '09:00', attendees: 6, status: 'completed' }
  ];

  const getStatusBadge = (status) => {
    return status === 'upcoming' ? styles.statusUpcoming : styles.statusCompleted;
  };

  return (
    <Card className={styles.trainingCard}>
      <div className={styles.header}>
        <h3>Training Schedule</h3>
        <Button variant="primary" size="small">+ Schedule Training</Button>
      </div>

      <div className={styles.trainingList}>
        {trainings.map(training => (
          <div key={training.id} className={styles.trainingItem}>
            <div className={styles.trainingHeader}>
              <div className={styles.trainingInfo}>
                <span className={styles.trainingTitle}>{training.title}</span>
                <span className={styles.trainingTrainer}>👤 {training.trainer}</span>
              </div>
              <span className={`${styles.status} ${getStatusBadge(training.status)}`}>
                {training.status}
              </span>
            </div>
            
            <div className={styles.trainingMeta}>
              <span>📅 {training.date} • {training.time}</span>
              <span>👥 {training.attendees} attendees</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrainingSchedule;
