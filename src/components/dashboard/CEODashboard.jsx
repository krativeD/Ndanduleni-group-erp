import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import Loader from '../common/Loader';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './Dashboard.module.css';

const CEODashboard = () => {
  const navigate = useNavigate();
  const { recentActivity, loading, error } = useDashboard('ceo');

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const modules = [
    { name: 'HR Module', description: 'Employees, Attendance, Payroll, Leave', path: '/hr/employees', icon: '👥', status: 'active' },
    { name: 'CRM Module', description: 'Contacts, Leads, Deals, Pipeline', path: '/crm/contacts', icon: '🤝', status: 'active' },
    { name: 'Services', description: 'Cleaning Operations & Scheduling', path: '/services/schedule', icon: '🧹', status: 'active' },
    { name: 'Inventory', description: 'Stock, Suppliers & Movements', path: '/inventory/stock', icon: '📦', status: 'active' },
    { name: 'Manufacturing', description: 'Product & Production', path: '/manufacturing/products', icon: '🏭', status: 'active' },
    { name: 'Sales & Orders', description: 'Orders, Quotations, Invoices, Payments', path: '/sales', icon: '🛒', status: 'active' },
    { name: 'Finance', description: 'Ledger, AP/AR, Cashflow, Budget, Reports', path: '/finance', icon: '💰', status: 'active' },
    { name: 'Procurement', description: 'Suppliers, Requisitions, POs, Contracts, RFQs', path: '/procurement', icon: '📋', status: 'active' },
    { name: 'Reports', description: 'Sales, Financial, Inventory, HR, Service Analytics', path: '/reports', icon: '📊', status: 'active' },
    { name: 'Documents', description: 'File Management System', path: '/documents', icon: '📁', status: 'active' },
    { name: 'Settings', description: 'System Configuration', path: '/settings', icon: '⚙️', status: 'active' }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>CEO Dashboard</h1>
        <p className={styles.welcome}>Welcome back. Here's your business overview.</p>
      </div>

      <Card className={styles.moduleGrid}>
        <div className={styles.moduleGridHeader}>
          <h3>System Modules</h3>
          <Button variant="primary" size="small" onClick={() => navigate('/users')}>
            👥 Staff Management
          </Button>
        </div>
        <div className={styles.moduleCards}>
          {modules.map((module, index) => (
            <div
              key={index}
              className={`${styles.moduleCard} ${module.status === 'coming-soon' ? styles.moduleCardDisabled : ''}`}
              onClick={() => { if (module.status === 'active') navigate(module.path); }}
            >
              <span className={styles.moduleIcon}>{module.icon}</span>
              <span className={styles.moduleName}>{module.name}</span>
              <span className={styles.moduleDesc}>{module.description}</span>
              {module.status === 'coming-soon' && <span className={styles.comingSoonBadge}>Coming Soon</span>}
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.bottomSection}>
        <RecentActivity activities={recentActivity} />
        <QuickActions role="ceo" />
      </div>
    </div>
  );
};

export default CEODashboard;
