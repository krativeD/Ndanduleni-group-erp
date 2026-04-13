import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ServiceSchedule.module.css';

const ServiceSchedule = ({ jobs, onJobClick }) => {
  const [view, setView] = useState('day');
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusBadge = (status) => {
    const badges = {
      'scheduled': styles.statusScheduled,
      'in-progress': styles.statusProgress,
      'completed': styles.statusCompleted,
      'pending': styles.statusPending
    };
    return badges[status] || styles.statusScheduled;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'low': styles.priorityLow,
      'medium': styles.priorityMedium,
      'high': styles.priorityHigh,
      'urgent': styles.priorityUrgent
    };
    return badges[priority] || styles.priorityMedium;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const todayJobs = jobs.filter(job => job.date === '2026-04-15');
  const upcomingJobs = jobs.filter(job => job.date > '2026-04-15');

  // Use setSelectedDate to avoid ESLint warning
  const handleDateSelect = (date) => {
    setSelectedDate(new Date(date));
  };

  return (
    <Card className={styles.scheduleCard}>
      <div className={styles.header}>
        <h3>Service Schedule</h3>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewBtn} ${view === 'day' ? styles.active : ''}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
            <button 
              className={`${styles.viewBtn} ${view === 'week' ? styles.active : ''}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`${styles.viewBtn} ${view === 'month' ? styles.active : ''}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
          </div>
          <Button variant="primary" size="small">+ New Job</Button>
        </div>
      </div>

      <div className={styles.scheduleSection}>
        <h4 className={styles.sectionTitle}>Today's Jobs</h4>
        <div className={styles.jobList}>
          {todayJobs.map(job => (
            <div 
              key={job.id} 
              className={styles.jobItem}
              onClick={() => {
                handleDateSelect(job.date);
                onJobClick(job);
              }}
            >
              <div className={styles.jobTime}>
                <span>{job.time}</span>
                <span className={styles.duration}>{job.duration}</span>
              </div>
              <div className={styles.jobContent}>
                <div className={styles.jobHeader}>
                  <span className={styles.jobClient}>{job.client}</span>
                  <span className={`${styles.jobPriority} ${getPriorityBadge(job.priority)}`}>
                    {job.priority}
                  </span>
                </div>
                <div className={styles.jobDetails}>
                  <span>{job.service} • {job.area}</span>
                  <span>👥 {job.team}</span>
                </div>
              </div>
              <div className={styles.jobStatus}>
                <span className={`${styles.statusBadge} ${getStatusBadge(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scheduleSection}>
        <h4 className={styles.sectionTitle}>Upcoming Jobs</h4>
        <div className={styles.jobList}>
          {upcomingJobs.slice(0, 5).map(job => (
            <div 
              key={job.id} 
              className={styles.jobItem}
              onClick={() => {
                handleDateSelect(job.date);
                onJobClick(job);
              }}
            >
              <div className={styles.jobTime}>
                <span>{formatDate(job.date)}</span>
                <span className={styles.duration}>{job.time}</span>
              </div>
              <div className={styles.jobContent}>
                <div className={styles.jobHeader}>
                  <span className={styles.jobClient}>{job.client}</span>
                  <span className={`${styles.jobPriority} ${getPriorityBadge(job.priority)}`}>
                    {job.priority}
                  </span>
                </div>
                <div className={styles.jobDetails}>
                  <span>{job.service} • {job.area}</span>
                  <span>👥 {job.team}</span>
                </div>
              </div>
              <div className={styles.jobStatus}>
                <span className={`${styles.statusBadge} ${getStatusBadge(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ServiceSchedule;
