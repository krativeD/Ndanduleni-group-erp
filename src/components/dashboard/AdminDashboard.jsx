import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import Card from '../common/Card';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { stats, recentActivity, loading, error } = useDashboard('admin');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const modules = [
    { name: 'HR Module', description: 'Employees, Attendance, Leave', path: '/hr/employees', icon: '👥' },
    { name: 'CRM Module', description: 'Contacts & Leads', path: '/crm/contacts', icon: '🤝' },
    { name: 'Services', description: 'Operations Management', path: '/services', icon: '🧹' },
    { name: 'Inventory', description: 'Stock Management', path: '/inventory', icon: '📦' }
  ];

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

      {/* Module Quick Access */}
      <Card className={styles.moduleGrid}>
        <h3 style={{ gridColumn: '1/-1', marginBottom: '16px' }}>Available Modules</h3>
        <div className={styles.moduleCards}>
          {modules.map((module, index) => (
            <div 
              key={index} 
              className={styles.moduleCard}
              onClick={() => navigate(module.path)}
            >
              <span className={styles.moduleIcon}>{module.icon}</span>
              <span className={styles.moduleName}>{module.name}</span>
              <span className={styles.moduleDesc}>{module.description}</span>
            </div>
          ))}
        </div>
      </Card>

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
