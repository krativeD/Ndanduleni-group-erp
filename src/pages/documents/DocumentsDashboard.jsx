import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './DocumentsStyles.module.css';

const DocumentsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'My Documents', path: '/documents/my', icon: '📄' },
    { name: 'Shared', path: '/documents/shared', icon: '↗️' },
    { name: 'Templates', path: '/documents/templates', icon: '📋' },
    { name: 'Workflows', path: '/documents/workflows', icon: '🔄' },
    { name: 'Archive', path: '/documents/archive', icon: '📦' },
    { name: 'Trash', path: '/documents/trash', icon: '🗑️' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Document Management</h1>
        </div>

        <Card className={styles.subNavCard}>
          <div className={styles.subNav}>
            {subModules.map((module, index) => (
              <button
                key={index}
                className={`${styles.subNavItem} ${location.pathname.includes(module.path) ? styles.subNavActive : ''}`}
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

export default DocumentsDashboard;
