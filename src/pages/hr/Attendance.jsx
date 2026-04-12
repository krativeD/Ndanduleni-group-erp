import React from 'react';
import Layout from '../../components/common/Layout';
import AttendanceCalendar from '../../components/hr/AttendanceCalendar';
import Card from '../../components/common/Card';
import { useAttendance } from '../../hooks/useHR';
import Loader from '../../components/common/Loader';
import styles from './HRStyles.module.css';

const Attendance = () => {
  const { attendance, loading, error } = useAttendance();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Attendance</h1>
        </div>

        <div className={styles.attendanceGrid}>
          <AttendanceCalendar attendance={attendance} />
          
          <Card className={styles.recentAttendance}>
            <h3>Today's Attendance</h3>
            <div className={styles.attendanceList}>
              {attendance.slice(0, 5).map(record => (
                <div key={record.id} className={styles.attendanceItem}>
                  <span className={styles.employeeName}>{record.employee}</span>
                  <span className={`${styles.status} ${styles[record.status]}`}>
                    {record.status}
                  </span>
                  <span className={styles.time}>
                    {record.clock_in ? record.clock_in.slice(11, 16) : '--:--'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
