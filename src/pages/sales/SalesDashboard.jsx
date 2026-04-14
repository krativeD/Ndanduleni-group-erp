import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './SalesStyles.module.css';

const SalesDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'Orders', path: '/sales/orders', icon: '📋' },
    { name: 'Quotations', path: '/sales/quotations', icon: '📄' },
    { name: 'Invoices', path: '/sales/invoices', icon: '🧾' },
    { name: 'Payments', path: '/sales/payments', icon: '💳' },
    { name: 'Deliveries', path: '/sales/deliveries', icon: '🚚' },
    { name: 'Pipeline', path: '/sales/pipeline', icon: '📊' },
    { name: 'Commissions', path: '/sales/commissions', icon: '💰' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Sales & Orders</h1>
        </div>

        {/* Sub-navigation Tabs */}
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

        {/* Render the selected sub-page */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
