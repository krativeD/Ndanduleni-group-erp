import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './SalesStyles.module.css';

const SalesDashboard = () => {
  const navigate = useNavigate();

  const subModules = [
    { name: 'Orders', path: '/sales/orders', icon: '📋', description: 'Manage customer orders', color: '#6366f1' },
    { name: 'Quotations', path: '/sales/quotations', icon: '📄', description: 'Create and send quotes', color: '#f59e0b' },
    { name: 'Invoices', path: '/sales/invoices', icon: '🧾', description: 'Generate invoices', color: '#10b981' },
    { name: 'Services', path: '/sales/description', icon: '📝', description: 'Service catalog', color: '#8b5cf6' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Sales & Orders</h1>
            <p className={styles.pageDescription}>Manage your sales pipeline and customer transactions</p>
          </div>
        </div>

        {/* Module Overview Cards */}
        <div className={styles.moduleOverview}>
          {subModules.map((module, index) => (
            <Card 
              key={index} 
              className={styles.moduleCard}
              onClick={() => navigate(module.path)}
            >
              <div className={styles.moduleIcon} style={{ background: module.color }}>
                {module.icon}
              </div>
              <div className={styles.moduleContent}>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
              </div>
              <span className={styles.moduleArrow}>→</span>
            </Card>
          ))}
        </div>

        {/* Content Area - Direct outlet without tab bar */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
