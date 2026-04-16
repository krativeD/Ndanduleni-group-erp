import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import Card from '../common/Card';
import styles from './Dashboard.module.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { stats, recentActivity, loading, error } = useDashboard('staff');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const modules = [
    { name: 'My Attendance', description: 'Clock in/out & view history', path: '/hr/attendance', icon: '📍' },
    { name: 'My Tasks', description: 'View assigned tasks', path: '/crm/activities', icon: '📋' },
    { name: 'Service Jobs', description: 'View cleaning jobs', path: '/services/jobs', icon: '🧹' },
    { name: 'My Documents', description: 'Access my documents', path: '/documents/my', icon: '📁' },
    { name: 'My Profile', description: 'Update personal info', path: '/profile', icon: '👤' }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Staff Dashboard</h1>
        <p className={styles.welcome}>Welcome back. Here's your personal overview.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="My Projects" value={stats.activeProjects} icon="📋" color="primary" />
        <StatCard title="Pending Tasks" value={stats.pendingOrders} icon="✅" color="warning" />
        <StatCard title="Attendance Rate" value={`${stats.attendanceRate}%`} icon="📍" color="success" />
        <StatCard title="Leave Balance" value="12 days" icon="🏖️" color="info" />
      </div>

      <Card className={styles.moduleGrid}>
        <h3 style={{ gridColumn: '1/-1', marginBottom: '16px' }}>Quick Access</h3>
        <div className={styles.moduleCards}>
          {modules.map((module, index) => (
            <div key={index} className={styles.moduleCard} onClick={() => navigate(module.path)}>
              <span className={styles.moduleIcon}>{module.icon}</span>
              <span className={styles.moduleName}>{module.name}</span>
              <span className={styles.moduleDesc}>{module.description}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.bottomSection}>
        <RecentActivity activities={recentActivity} />
        <QuickActions role="staff" />
      </div>
    </div>
  );
};

export default StaffDashboard;
