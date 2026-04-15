import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './ProcurementStyles.module.css';

const ProcurementDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'Suppliers', path: '/procurement/suppliers', icon: '🏢' },
    { name: 'Requisitions', path: '/procurement/requisitions', icon: '📋' },
    { name: 'Orders', path: '/procurement/orders', icon: '📦' },
    { name: 'Receipts', path: '/procurement/receipts', icon: '✅' },
    { name: 'Contracts', path: '/procurement/contracts', icon: '📄' },
    { name: 'RFQs', path: '/procurement/rfqs', icon: '📬' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Procurement Management</h1>
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

export default ProcurementDashboard;
