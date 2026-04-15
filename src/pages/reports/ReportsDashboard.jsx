import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './ReportsStyles.module.css';

const ReportsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'Sales', path: '/reports/sales', icon: '📊' },
    { name: 'Financial', path: '/reports/financial', icon: '💰' },
    { name: 'Inventory', path: '/reports/inventory', icon: '📦' },
    { name: 'HR', path: '/reports/hr', icon: '👥' },
    { name: 'Services', path: '/reports/services', icon: '🧹' },
    { name: 'Custom', path: '/reports/custom', icon: '⚙️' },
    { name: 'Scheduled', path: '/reports/scheduled', icon: '📅' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Reports & Analytics</h1>
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

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default ReportsDashboard;
