import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import styles from './Dashboard.module.css';

const StaffDashboard = () => {
  const { stats, recentActivity, loading, error } = useDashboard('staff');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Staff Dashboard</h1>
        <p className={styles.welcome}>Welcome back. Here's your personal overview.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          title="My Projects" 
          value={stats.activeProjects} 
          icon="📋" 
          color="primary"
        />
        <StatCard 
          title="Pending Tasks" 
          value={stats.pendingOrders} 
          icon="✅" 
          color="warning"
        />
        <StatCard 
          title="Attendance Rate" 
          value={`${stats.attendanceRate}%`} 
          icon="📍" 
          color="success"
        />
        <StatCard 
          title="Leave Balance" 
          value="12 days" 
          icon="🏖️" 
          color="info"
        />
      </div>

      <div className={styles.bottomSection}>
        <RecentActivity activities={recentActivity} />
        <QuickActions role="staff" />
      </div>
    </div>
  );
};

export default StaffDashboard;
