import React from 'react';
import Card from '../../components/common/Card';
import { useStaffSummary, useLeaveRequests, useJobAssignments, useAttendance } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Overview = () => {
  const { summary, loading: summaryLoading } = useStaffSummary();
  const { requests } = useLeaveRequests();
  const { jobs } = useJobAssignments();
  const { attendance } = useAttendance();

  if (summaryLoading) return <Loader />;

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const pendingRequests = requests.filter(r => r.status === 'pending').slice(0, 5);
  const recentJobs = jobs.slice(0, 5);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}><span>Total Staff</span><h2>{summary.totalStaff}</h2></Card>
        <Card className={styles.summaryCard}><span>On Leave</span><h2>{summary.onLeave}</h2></Card>
        <Card className={styles.summaryCard}><span>Present Today</span><h2>{summary.presentToday}</h2></Card>
        <Card className={styles.summaryCard}><span>Pending Leave</span><h2 style={{ color: '#f59e0b' }}>{summary.pendingLeave}</h2></Card>
        <Card className={styles.summaryCard}><span>Pending Reviews</span><h2>{summary.pendingReviews}</h2></Card>
        <Card className={styles.summaryCard}><span>Active Training</span><h2>{summary.activeTraining}</h2></Card>
      </div>

      <div className={styles.twoColumn}>
        <Card className={styles.listCard}>
          <h3>Today's Attendance</h3>
          {todayAttendance.map(a => (
            <div key={a.id} className={styles.listItem}>
              <span>{a.employee}</span>
              <span className={a.status === 'present' ? styles.present : styles.absent}>{a.status}</span>
            </div>
          ))}
        </Card>

        <Card className={styles.listCard}>
          <h3>Pending Leave Requests</h3>
          {pendingRequests.map(r => (
            <div key={r.id} className={styles.listItem}>
              <span>{r.employee} - {r.type}</span>
              <span>{r.startDate} to {r.endDate}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card className={styles.listCard}>
        <h3>Recent Job Assignments</h3>
        {recentJobs.map(j => (
          <div key={j.id} className={styles.listItem}>
            <span>{j.employee} - {j.jobTitle}</span>
            <span>{j.currentProject || 'Unassigned'}</span>
            <span className={styles.workload}>Workload: {j.workload}%</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Overview;
