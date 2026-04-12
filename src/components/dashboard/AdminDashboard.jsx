import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
  const { stats, recentActivity, loading, error } = useDashboard('admin');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p className={styles.welcome}>Welcome back. Here's your department overview.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          title="Department Staff" 
          value={stats.totalEmployees} 
          icon="👥" 
          trend="up" 
          trendValue={1.8}
          color="primary"
        />
        <StatCard 
          title="Department Revenue" 
          value={`$${(stats.totalRevenue / 1000).toFixed(0)}k`} 
          icon="💰" 
          trend="up" 
          trendValue={8.3}
          color="success"
        />
        <StatCard 
          title="Active Projects" 
          value={stats.activeProjects} 
          icon="📊" 
          trend="up" 
          trendValue={4.1}
          color="info"
        />
        <StatCard 
          title="Attendance Rate" 
          value={`${stats.attendanceRate}%`} 
          icon="📅" 
          trend="up" 
          trendValue={1.5}
          color="success"
        />
      </div>

      <div className={styles.chartSection}>
        <RevenueChart />
      </div>

      <div className={styles.bottomSection}>
        <RecentActivity activities={recentActivity} />
        <QuickActions role="admin" />
      </div>
    </div>
  );
};

export default AdminDashboard;
