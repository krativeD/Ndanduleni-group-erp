import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import styles from './Dashboard.module.css';

const CEODashboard = () => {
  const { stats, recentActivity, loading, error } = useDashboard('ceo');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>CEO Dashboard</h1>
        <p className={styles.welcome}>Welcome back. Here's your business overview.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          title="Total Employees" 
          value={stats.totalEmployees} 
          icon="👥" 
          trend="up" 
          trendValue={2.4}
          color="primary"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${(stats.totalRevenue / 1000).toFixed(0)}k`} 
          icon="💰" 
          trend="up" 
          trendValue={12.5}
          color="success"
        />
        <StatCard 
          title="Active Projects" 
          value={stats.activeProjects} 
          icon="📊" 
          trend="up" 
          trendValue={5.2}
          color="info"
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders} 
          icon="📦" 
          trend="down" 
          trendValue={3.1}
          color="warning"
        />
      </div>

      <div className={styles.chartSection}>
        <RevenueChart />
      </div>

      <div className={styles.bottomSection}>
        <RecentActivity activities={recentActivity} />
        <QuickActions role="ceo" />
      </div>
    </div>
  );
};

export default CEODashboard;
