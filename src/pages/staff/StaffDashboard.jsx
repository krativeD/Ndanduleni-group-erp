import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import { useStaffSummary } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary, loading } = useStaffSummary();

  const subModules = [
    { name: 'Overview', path: '/staff', icon: '📊' },
    { name: 'Leave Requests', path: '/staff/leave', icon: '🏖️' },
    { name: 'Job Assignments', path: '/staff/jobs', icon: '📋' },
    { name: 'Attendance', path: '/staff/attendance', icon: '📍' },
    { name: 'Performance', path: '/staff/performance', icon: '⭐' },
    { name: 'Training', path: '/staff/training', icon: '📚' },
    { name: 'Directory', path: '/staff/directory', icon: '👥' }
  ];

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Staff Management</h1>
        </div>

        <Card className={styles.subNavCard}>
          <div className={styles.subNav}>
            {subModules.map((module, index) => (
              <button
                key={index}
                className={`${styles.subNavItem} ${location.pathname === module.path ? styles.subNavActive : ''}`}
                onClick={() => navigate(module.path)}
              >
                <span className={styles.subNavIcon}>{module.icon}</span>
                <span className={styles.subNavLabel}>{module.name}</span>
              </button>
            ))}
          </div>
        </Card>

        {location.pathname === '/staff' && summary && (
          <div className={styles.summaryGrid}>
            <Card className={styles.summaryCard}><span>Total Staff</span><h2>{summary.totalStaff}</h2></Card>
            <Card className={styles.summaryCard}><span>On Leave</span><h2>{summary.onLeave}</h2></Card>
            <Card className={styles.summaryCard}><span>Present Today</span><h2>{summary.presentToday}</h2></Card>
            <Card className={styles.summaryCard}><span>Pending Leave</span><h2 style={{ color: '#f59e0b' }}>{summary.pendingLeave}</h2></Card>
            <Card className={styles.summaryCard}><span>Pending Reviews</span><h2>{summary.pendingReviews}</h2></Card>
            <Card className={styles.summaryCard}><span>Active Training</span><h2>{summary.activeTraining}</h2></Card>
          </div>
        )}

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
