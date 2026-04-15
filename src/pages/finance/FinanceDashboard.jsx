import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './FinanceStyles.module.css';

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'Ledger', path: '/finance/ledger', icon: '📒' },
    { name: 'Payables', path: '/finance/payables', icon: '💰' },
    { name: 'Receivables', path: '/finance/receivables', icon: '📥' },
    { name: 'Cashflow', path: '/finance/cashflow', icon: '💵' },
    { name: 'Budget', path: '/finance/budget', icon: '📊' },
    { name: 'Reports', path: '/finance/reports', icon: '📈' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Finance Management</h1>
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

export default FinanceDashboard;
