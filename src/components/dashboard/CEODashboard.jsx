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

const CEODashboard = () => {
  const navigate = useNavigate();
  const { stats, recentActivity, loading, error } = useDashboard('ceo');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const modules = [
    { name: 'HR Module', description: 'Employees, Attendance, Payroll, Leave', path: '/hr/employees', icon: '👥', status: 'active' },
    { name: 'CRM Module', description: 'Contacts, Leads, Deals, Pipeline', path: '/crm/contacts', icon: '🤝', status: 'active' },
    { name: 'Services', description: 'Cleaning Operations & Scheduling', path: '/services/schedule', icon: '🧹', status: 'active' },
    { name: 'Inventory', description: 'Stock, Equipment & Supplies', path: '/inventory', icon: '📦', status: 'coming-soon' },
    { name: 'Manufacturing', description: 'Product & Production', path: '/manufacturing', icon: '🏭', status: 'coming-soon' },
    { name: 'Sales & Orders', description: 'Sales Pipeline & Orders', path: '/sales', icon: '🛒', status: 'coming-soon' },
    { name: 'Finance', description: 'Accounting & Financial Reports', path: '/finance', icon: '💰', status: 'coming-soon' },
    { name: 'Procurement', description: 'Purchasing & Suppliers', path: '/procurement', icon: '📋', status: 'coming-soon' },
    { name: 'Reports', description: 'Analytics & Business Intelligence', path: '/reports', icon: '📊', status: 'coming-soon' },
    { name: 'Documents', description: 'File Management System', path: '/documents', icon: '📁', status: 'coming-soon' },
    { name: 'Settings', description: 'System Configuration', path: '/settings', icon: '⚙️', status: 'coming-soon' }
  ];

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

      {/* Module Quick Access */}
      <Card className={styles.moduleGrid}>
        <h3 style={{ gridColumn: '1/-1', marginBottom: '16px' }}>System Modules</h3>
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
        <QuickActions role="ceo" />
      </div>
    </div>
  );
};

export default CEODashboard;
