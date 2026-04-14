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
    { name: 'HR Module', description: 'Employees, Attendance, Leave', path: '/hr/employees', icon: '👥', status: 'active' },
    { name: 'CRM Module', description: 'Contacts & Leads Management', path: '/crm/contacts', icon: '🤝', status: 'active' },
    { name: 'Services', description: 'Cleaning Operations', path: '/services/schedule', icon: '🧹', status: 'active' },
    { name: 'Inventory', description: 'Stock & Suppliers', path: '/inventory/stock', icon: '📦', status: 'active' },
    { name: 'Sales', description: 'Orders & Invoices', path: '/sales', icon: '🛒', status: 'active' },
    { name: 'Reports', description: 'Analytics & Reports', path: '/reports', icon: '📊', status: 'coming-soon' }
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
          value={`R ${(stats.totalRevenue / 1000).toFixed(0)}k`}
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
              className={`${styles.moduleCard} ${module.status === 'coming-soon' ? styles.moduleCardDisabled : ''}`}
              onClick={() => {
                if (module.status === 'active') {
                  navigate(module.path);
                }
              }}
            >
              <span className={styles.moduleIcon}>{module.icon}</span>
              <span className={styles.moduleName}>{module.name}</span>
              <span className={styles.moduleDesc}>{module.description}</span>
              {module.status === 'coming-soon' && (
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              )}
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
